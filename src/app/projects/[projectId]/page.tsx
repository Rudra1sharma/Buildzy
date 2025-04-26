export default function ProjectDetails({ params }: { params: { projectId: string } }) {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Project: {params.projectId}</h1>
            
            <ol className="mt-4">
                <p>isme folders dikjenge jo bnaye h project ke andar</p>
                <p>Invite ka option ayega</p>
                <p>Members count dikega,</p>
            </ol>
            <p className="mt-4">isme folders dikjenge jo bnaye h project ke andar, Invite ka option ayega, 
                Members count dikega, 
            </p>
        </div>
    );
}