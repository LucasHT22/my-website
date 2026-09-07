import Head from "next/head";
import Layout from "../components/layout";
import { projects } from '../lib/projects';

export default function Projects() {
    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>

            <h1>Projects</h1>
            <p>A few of the projects I'm most proud of</p>

            <div className="projects-grid">
                {projects.map((project) => (
                    <article className="project-card" key={project.name}>
                        <img src={project.image} />

                        <div className="project-content">
                            <h2>{project.name}</h2>

                            <p>{project.description}</p>

                            <div className="tags">
                                {project.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>

                            <div className="links">
                                <a href={project.github || undefined} className={!project.github ? 'disabled' : ''} onClick={(e) => {
                                    if (!project.github) e.preventDefault();
                                }}>
                                    GitHub
                                </a>

                                <a href={project.demo || undefined} className={!project.demo ? 'disabled' : ''} onClick={(e) => {
                                    if (!project.demo) e.preventDefault();
                                }}>
                                    Demo
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </Layout>
    )
}