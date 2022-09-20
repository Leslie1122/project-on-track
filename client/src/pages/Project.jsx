import { Link, useParams } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';



export default function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT,
        { variables: { id } });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return <>
        {!loading && !error && (
            <div className="mx-auto w-75 card p-5">

                <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1>{data.project.name}</h1>


                    <Link to='/' className='btn btn-sm btn-light w-25 ms-auto'>Back</Link>
                </div>
                    <p>{data.project.description}</p>


                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{data.project.status}</p>

                <ClientInfo client={data.project.client} />

                <p className="d-flex justify-content-between align-items-center pt-3 pb-2 ms-auto">
                    <button class="btn btn-primary btn-sm me-3" type="button" data-bs-toggle="collapse" data-bs-target="#editProjectForm" aria-expanded="false" aria-controls="editProjectForm">
                    <MdExpandMore className='icon' /> Update Project Details
                    </button>
                    <DeleteProjectButton projectId={data.project.id} />
                </p>
                <div class="collapse" id="editProjectForm">
                    <div class="card card-body">
                    <EditProjectForm project={data.project} />
                    </div>
                </div>

                


            </div>
        )}
    </>;
}
