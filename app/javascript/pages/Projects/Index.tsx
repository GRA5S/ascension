import { useState } from 'react'
import { router, Link } from '@inertiajs/react'
import Pagination from '@/components/Pagination'
import type { ProjectCard, PagyProps } from '@/types'
import ProjectsForm from './Form'

export default function ProjectsIndex({
  projects,
  pagy,
  query,
  show_new_modal,
  hackatime_projects,
}: {
  projects: ProjectCard[]
  pagy: PagyProps
  query: string
  show_new_modal?: boolean
  hackatime_projects: any[]
}) {
  const [searchQuery, setSearchQuery] = useState(query)

  function search(e: React.FormEvent) {
    e.preventDefault()
    router.get('/projects', { query: searchQuery }, { preserveState: true })
  }

  function closeModal() {
    router.get('/projects', {}, { preserveState: true, preserveScroll: true })
  }

  const emptyProjectTemplate = {
    name: '',
    description: '',
    demo_link: '',
    repo_link: '',
    is_unlisted: false,
    tags: [],
    hackatime_projects: [],
  }

  return (
    <div className="projects-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-4xl">Projects</h1>
      </div>

      <form onSubmit={search}>
        <div className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="search-form__input"
          />
          <button type="submit" className="search-form__button">
            Search
          </button>
        </div>
      </form>

      {projects.length > 0 ? (
        <>
          <div className="project-grid">
            <Link
              href="/projects?new=true"
              preserveState
              preserveScroll
              className="project-card project-card--new"
            >
              <h1>+</h1>
              <h3>New Project</h3>
            </Link>
            {projects.map((project) => {
              let status: 'unshipped' | 'shipped' | 'approved' | 'issue' = 'unshipped';
              if (project.ships_count > 0) {
                if (globalThis === null /* TODO: replace this with actual logic to detect if the project is approved */)
                  status = 'approved';
                else status = 'shipped';
              };
              if (globalThis === null /* TODO: replace this with a check--is there any issue? (mainly, if the project has been rejected and needs something added) */) {
                status = 'issue';
              }
              const statusColors: Record<'unshipped' | 'shipped' | 'approved' | 'issue', string> = {
                unshipped: 'var(--blue)',
                shipped: 'var(--purple)',
                approved: 'var(--yellow)',
                issue: 'var(--purple)'
              }
              const currentBg = statusColors[status] || 'var(--blue)';
              if (project.discarded_at) return null;
              return(
                <Link 
                  href={`/projects/${project.id}`} 
                  key={project.id}
                  className={`project-card ${status === 'issue' ? 'has-issue' : ''}`}
                  style={{ '--card-bg': currentBg } as React.CSSProperties}
                >
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFb9q4YTo6wXrUBm1qz7c3jfc47rclFLEVQ&s" alt=""/>
                  <div className="text">
                    {/* TODO: add actual hours field */}
                    <h4>hours fields need to go here </h4>
                    <h1>
                        {project.name}
                    </h1>
                    <p>{project.description || "No description provided. Write one here!"}</p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="bg-white/10 text-sm px-2 py-1 rounded">{tag}</span>
                          // need to fix styling of this to no longer use tailwind--not urgent, but technically todo
                        ))}
                      </div>
                    )}
                  </div>
                      </Link>
              );
            })}
          </div>
          <Pagination pagy={pagy} />
        </>
      ) : (
        <>
          <div className="project-grid">
            <Link
              href="/projects?new=true"
              preserveState
              preserveScroll
              className="project-card project-card--new"
            >
              New Project
            </Link>
          </div>
          <p className="text-gray-500">No projects yet.</p>
        </>
      )}
      {show_new_modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={closeModal} />

          <div className="relative bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full z-10 max-h-[90vh] overflow-y-auto m-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer z-20"
            >
              ✕
            </button>

            {/* Mount the shared template directly inside the viewport box */}
            <ProjectsForm
              project={emptyProjectTemplate}
              title="Create a New Project"
              submit_url="/projects"
              method="post"
              fallback_hackatime_projects={hackatime_projects}
            />
          </div>
        </div>
      )}
    </div>
  )
}
