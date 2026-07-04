import { router, Link } from '@inertiajs/react'
import type { ProjectDetail } from '@/types'

function isSafeUrl(url: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export default function ProjectsShow({
  project,
  can,
}: {
  project: ProjectDetail
  can: { update: boolean; destroy: boolean }
}) {
  function deleteProject() {
    if (confirm('Are you sure?')) {
      router.delete(`/projects/${project.id}`)
    }
  }

  function shipProject() {
    if (confirm('Submit this project for review?')) {
      router.post(`/ships`, { project_id: project.id })
    }
  }

  let last_ship_status = project.ships.at(-1)?.status
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-4xl">{project.name}</h1>
        <div className="flex gap-2">
          {can.update && (
            <Link href={`/projects/${project.id}/edit`} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Edit
            </Link>
          )}
          {can.update && (
            <button onClick={shipProject} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ship
            </button>
          )}
          {can.destroy && (
            <button onClick={deleteProject} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
          )}
        </div>
      </div>

      {last_ship_status === "pending" && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded mb-4">review pending</span>
      )}
      {(last_ship_status === "rejected" || last_ship_status === "returned") && (
        <span className="inline-block bg-red-100 text-yellow-800 text-sm px-2 py-1 rounded mb-4">rejected</span>
      )}
      {last_ship_status === "approved" && (
        <span className="inline-block bg-green-100 text-yellow-800 text-sm px-2 py-1 rounded mb-4">approved</span>
      )}
      {project.is_unlisted && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded mb-4">Unlisted</span>
      )}

      {project.description && <p className="text-gray-700 mb-4">{project.description}</p>}
      <p className="text-gray-700 mb-4">{project.hours}hrs tracked</p>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        {isSafeUrl(project.demo_link) && (
          <a href={project.demo_link!} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
            Demo
          </a>
        )}
        {isSafeUrl(project.repo_link) && (
          <a href={project.repo_link!} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
            Repository
          </a>
        )}
      </div>
      {can.update && (
        <Link href={`/projects/${project.id}/devlog`} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
          Create Devlog
        </Link>
      )}
      <br></br>
      {project.devlogs.map((devlog) => (
        <span key={devlog.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded w-full block my-5">
          <div className="flex flex-col">
            <h1 className="text-3xl w-full flex justify-center">{devlog.title}</h1>
            <h2 className="text-xl w-full flex justify-center">{devlog.body}</h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4">
              {devlog.images.map((image) => (
                <div key={image} className="snap-start shrink-0 w-80">
                  <img src={image}></img>
                </div>
              ))}
            </div>
          </div>

          <br></br>
        </span>
      ))}

      <p className="text-sm text-gray-500 mt-10">
        Created by {project.user_display_name} on {project.created_at}
      </p>
    </div>
  )
}
