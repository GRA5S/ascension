import { useForm, usePage } from '@inertiajs/react'
import type { ProjectForm, SharedProps } from '@/types'

export default function ProjectsForm({
  project,
  title,
  submit_url,
  method,
  fallback_hackatime_projects,
}: {
  project: ProjectForm
  title: string
  submit_url: string
  method: string
  fallback_hackatime_projects: any[]
}) {
  const { errors, auth } = usePage<SharedProps>().props
  const availableProjects = auth.user?.hackatime_projects || fallback_hackatime_projects || []

  const form = useForm({
    name: project.name,
    description: project.description,
    demo_link: project.demo_link,
    repo_link: project.repo_link,
    is_unlisted: project.is_unlisted,
    tags: project.tags,
    hackatime_projects: project.hackatime_projects,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (method === 'patch') {
      form.patch(submit_url)
    } else {
      form.post(submit_url)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="font-bold text-4xl mb-6">{title}</h1>

      <form onSubmit={submit} className="space-y-4">
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
            <ul>
              {Object.entries(errors).map(([field, messages]) =>
                messages.map((msg) => (
                  <li key={`${field}-${msg}`}>
                    {field} {msg}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={form.data.description}
            onChange={(e) => form.setData('description', e.target.value)}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="demo_link" className="block text-sm font-medium text-gray-700">
            Demo link
          </label>
          <input
            type="url"
            id="demo_link"
            value={form.data.demo_link}
            onChange={(e) => form.setData('demo_link', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://"
          />
        </div>

        <div>
          <label htmlFor="repo_link" className="block text-sm font-medium text-gray-700">
            Repo link
          </label>
          <input
            type="url"
            id="repo_link"
            value={form.data.repo_link}
            onChange={(e) => form.setData('repo_link', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://"
          />
        </div>
        {/* <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.data.is_unlisted}
              onChange={(e) => form.setData('is_unlisted', e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Unlisted</span>
          </label>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
           Hackatime Projects
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableProjects.map((proj) => (
              <label key={proj.name} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  value={proj.name}
                  checked={form.data.hackatime_projects?.includes(proj.name) || false}
                  onChange={(e) => {
                    const selected = form.data.hackatime_projects || []
                    if (e.target.checked) {
                      form.setData('hackatime_projects', [...selected, proj.name])
                    } else {
                      form.setData('hackatime_projects', selected.filter(p => p !== proj.name))
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{proj.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            disabled={form.processing}
          >
            {form.processing ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
