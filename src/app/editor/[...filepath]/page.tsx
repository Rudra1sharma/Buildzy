'use client';

import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import debounce from 'lodash/debounce';

export default function App() {
    const params = useParams();
    const { data: session, status } = useSession();
    const socketRef = useRef<Socket | null>(null);
    const editorRef = useRef<any>(null);
    const lastChangeRef = useRef<string>('');
    const filepath = Array.isArray(params.filepath) ? params.filepath.join('/') : params.filepath;
    console.log('Filepath:', filepath);
    const debouncedSave = useCallback(
        debounce(async (projectData: any) => {
            try {
                console.log('Saving project data:', projectData);
                const response = await fetch(`/api/editor/${filepath}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        projectData,
                        userId: session?.user?.id
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to save editor data');
                }

                console.log('Editor data saved successfully');
            } catch (error) {
                console.error('Error saving editor data:', error);
            }
        }, 1000),
        [filepath, session?.user?.id]
    );

    const handleSave = async () => {
        if (!editorRef.current) return;
        const content = editorRef.current.getProjectData();
        console.log('Saving content:', editorRef.current);
        await fetch('/api/file/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filepath,
                content: JSON.stringify(content),
                name: filepath?.split('/').pop(),
                Project: filepath?.split('/')[0],
                owner_id: session?.user?.id,
            }),
        });
    };

    useEffect(() => {
        // Initialize socket connection
        const socket = io(window.location.origin, {
            path: '/api/socket/io',
            addTrailingSlash: false,
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
            socketRef.current = socket;
            // Join the editor room after connection
            socket.emit('join-editor', filepath);
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Listen for editor updates from other users
        socket.on('editor-update', (changes: any) => {
            console.log('Received changes from other user');
            if (editorRef.current) {
                // Prevent applying our own changes back to us
                const changeString = JSON.stringify(changes);
                if (changeString !== lastChangeRef.current) {
                    editorRef.current.loadProjectData(changes);
                }
            }
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [filepath]);

    if (status === "loading") {
        return <p>Loading editor...</p>;
    }

    if (status === "unauthenticated" || !session || !session.user || !session.user.id) {
        return <p>User not authenticated. Please log in to use the editor.</p>;
    }

    const userId = String(session.user.id);
    // const editorIdFromUrl = String(params.editorId);

    // if (!editorIdFromUrl || editorIdFromUrl === "undefined" || editorIdFromUrl === "null") {
    //   return <p>Error: Project ID from URL is invalid. Value: '{editorIdFromUrl}'</p>;
    // }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <StudioEditor
                options={{
                    licenseKey: 'DEMO_LOCALHOST_KEY',
                    // project: {
                    //     type: 'web',
                    //     id: filepath,
                    //     // CORRECT: Place storage config inside the project object
                    //     store: {
                    //         type: 'none',
                    //     },
                    // },
                    identity: {
                        id: userId
                    },
                }}
                onEditor={(editor) => {
                    // Store editor instance in ref
                    editorRef.current = editor;

                    // Load initial data from server
                    fetch(`/api/editor/${filepath}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.editor?.projectData) {
                                editor.loadProjectData(data.editor.projectData);
                            }
                        })
                        .catch(console.error);

                    // Listen for changes and save them
                    editor.on('change', () => {
                        const projectData = editor.getProjectData();

                        // Store the current change for comparison
                        lastChangeRef.current = JSON.stringify(projectData);

                        // Save to server (debounced)
                        debouncedSave(projectData);

                        // Broadcast to other users
                        if (socketRef.current?.connected) {
                            console.log('Broadcasting changes to other users');
                            socketRef.current.emit('editor-change', {
                                editorId: filepath,
                                changes: projectData
                            });
                        }
                    });
                }}
            />
        </div>
    );
}

// Add TypeScript declaration for global editor
declare global {
    interface Window {
        editor: any;
    }
}
