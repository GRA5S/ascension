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
    hackatime_projects: []
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-4xl">Projects</h1>
        <Link 
          href="/projects?new=true"
          preserveState
          preserveScroll
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>

      <form onSubmit={search} className="mb-6">
        <div className="flex gap-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="border rounded px-3 py-2 flex-1"
          />
          <button type="submit" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
            Search
          </button>
        </div>
      </form>

      {projects.length > 0 ? (
        <>
          {projects.map((project) => (
            <div>
              {!project.discarded_at ? (
                <div key={project.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                          <Link href={`/projects/${project.id}`} className="hover:underline">
                            {project.name}
                          </Link>
                        </h2>
                        {project.is_unlisted && <span className="text-sm text-gray-500">Unlisted</span>}
                      </div>

                      {project.description && <p className="text-gray-600 mt-2">{project.description}</p>}

                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        <span>by {project.user_display_name}</span>
                        <span>{project.ships_count} ships</span>
                      </div>
                </div>
              ): null }
            </div>
          ))}

          <Pagination pagy={pagy} />
        </>
      ) : (
        <p className="text-gray-500">No projects yet.</p>
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
