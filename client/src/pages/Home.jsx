import React from 'react'
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4 pt-4"><AddClientModal /><AddProjectModal /></div>
            <Projects />
            
            <div className='pt-4 my-md-5 pt-md-5 border-top'>
                <h3>Clients</h3>
                <Clients />
            </div>
            
        </>
    )
}
