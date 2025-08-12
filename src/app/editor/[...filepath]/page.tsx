'use client';

import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useCallback, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import debounce from 'lodash/debounce';

export default function App() {
    const params = useParams();
    const { data: session, status } = useSession();

    const socketRef = useRef<Socket | null>(null);
    const editorRef = useRef<any>(null);
    const lastChangeRef = useRef<string>('');

    const filepath = Array.isArray(params.filepath) ? params.filepath.join('/') : params.filepath;

    const [project, setProject] = useState<any>(null); // null until loaded
    const [loading, setLoading] = useState(true);

    const debouncedSave = useCallback(
        debounce(async (projectData: any) => {
            try {
                const response = await fetch(`/api/editor/${filepath}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectData,
                        userId: session?.user?.id
                    })
                });

                if (!response.ok) throw new Error('Failed to save editor data');
                console.log('Editor data saved successfully');
            } catch (error) {
                console.error('Error saving editor data:', error);
            }
        }, 1000),
        [filepath, session?.user?.id]
    );

    // Load project from backend before mounting editor
    useEffect(() => {
        if (!filepath) return;

        const loadProject = async () => {
            try {
                const res = await fetch(`/api/editor/${filepath}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const data = await res.json();
                setProject(data.editor?.projectData || { pages: [{ name: 'Home', component: '<h1>New project</h1>' }] });
                // console.log(data.editor?.projectData)
            } catch (err) {
                console.error('Error loading project:', err);
                setProject({ pages: [{ name: 'Home', component: '<h1>New project</h1>' }] });
            } finally {
                setLoading(false);
            }
        };

        loadProject();
        const socket = io(window.location.origin, {
            path: '/api/socket/io',
            addTrailingSlash: false,
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            socketRef.current = socket;
            socket.emit('join-editor', filepath);
        });

        socket.on('editor-update', (changes: any) => {
            if (editorRef.current) {
                const changeString = JSON.stringify(changes);
                if (changeString !== lastChangeRef.current) {
                    console.log('Applying remote changes');
                    editorRef.current.loadProjectData(changes);
                }
            }
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        return () => {
            socket.disconnect();
        };
    }, [filepath]);
    if (status === 'loading' || loading) {
        return <p>Loading editor...</p>;
    }

    if (status === 'unauthenticated' || !session?.user?.id) {
        return <p>User not authenticated. Please log in.</p>;
    }

    const userId = String(session.user.id);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {project && (
                <StudioEditor
                    options={{
                        storage: {
                            type: 'self',
                            autosaveChanges: 1,
                            onSave: async ({project}: any) => {
                                console.log(project);
                                debouncedSave(project);
                            }, 
                            onLoad: async () => ({ project }),
                        },
                        storageManager: { autoload: false }, 
                        licenseKey: 'DEMO_LOCALHOST_KEY',
                        project: { type: 'web', id: filepath },
                        identity: { id: userId },
                    }}
                    onEditor={(editor: any) => {
                        editorRef.current = editor;

                        // Listen for local changes
                        editor.on('change', () => {
                            const projectData = editor.getProjectData();
                            lastChangeRef.current = JSON.stringify(projectData);

                            // Save to backend

                            // Send to other clients
                            if (socketRef.current?.connected) {
                                socketRef.current.emit('editor-change', {
                                    editorId: filepath,
                                    changes: projectData
                                });
                            }
                        });
                    }}
                />
            )}
        </div>
    );
}

