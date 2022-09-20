import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
    
    
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [clientId, setClientId] = useState(project.clientId);
    const [status, setStatus] = useState(() => {
        switch (project.status) {
          case "Not Started":
            return "new";
          case "In Progress":
            return "progress";
          case "Completed":
            return "completed";
          default:
            throw new Error(`Unknown status: ${project.status}`);
        }
      });

    // Get Clients for select
    const {loading, error, data} = useQuery(GET_CLIENTS);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status, clientId},
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id}}],
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status || !clientId) {
            return alert('Please fill out all fields');
        }

        updateProject(name, description, status, clientId);
    };

    

    if(loading) return null;
    if (error) return 'Something Went Wrong';

    return (
        <div className="my-2">
            {/* <h3 className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">Update Project Details</h3> */}
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Client</label>
                    <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-primary mt-2">Update</button></div>
                    
                
            </form>
        </div>
    )
}
