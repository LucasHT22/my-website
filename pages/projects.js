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

            <style jsx>{`
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                    margin-top: 32px;
                }
                
                .project-card {
                    overflow: hidden;
                    border: 1px solid #e5e5e5
                    border-radius: 12px;
                }
                
                .project-card img {
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    aspect-fit: cover;
                    display: block;
                }

                .project-content {
                    padding: 20px;
                }
                
                .project-content h2 {
                    margin: 0 0 8px;
                }

                .project-content p {
                    margin: 0 0 16px;
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-bottom: 18px;
                }
                
                .tags span {
                    padding: 4px 8px;
                    border-radius: 999px;
                    background: #f1f1f1;
                    font-size: 0.8rem;
                }

                .links {
                    display: flex;
                    gap: 8px;
                }

                .links a {
                    padding: 8px 14px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    text-decoration: none;
                }

                .links a.disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
            `}</style>
        </Layout>
    )
}