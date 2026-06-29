import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import type { Devlog, SharedProps } from '@/types'

export default function DevlogForm({ devlog, submit_url }: { devlog: Devlog; submit_url: string }) {
  const { errors, auth } = usePage<SharedProps>().props

  const form = useForm({
    title: devlog.title,
    body: devlog.body,
    images: devlog.images,
  })

  const [imageUrl, setImageUrl] = useState('')

  function addImage() {
    if (imageUrl.trim() && !form.data.images.includes(imageUrl.trim())) {
      form.setData('images', [...form.data.images, imageUrl.trim()])
      setImageUrl('')
    }
  }

  function removeImage(url: string) {
    form.setData(
      'images',
      form.data.images.filter((i) => i !== url),
    )
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    form.post(submit_url)
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="font-bold text-4xl mb-6">Create Devlog</h1>

      <form onSubmit={submit} className="space-y-4">
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
            <ul>
              {Object.entries(errors).map(([field, messages]) =>
                (messages as string[]).map((msg: string) => (
                  <li key={`${field}-${msg}`}>
                    {field} {msg}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={form.data.title}
            onChange={(e) => form.setData('title', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            value={form.data.body}
            onChange={(e) => form.setData('body', e.target.value)}
            rows={6}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              placeholder="https://"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={addImage}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer shrink-0"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.data.images.map((url) => (
              <div key={url} className="relative group">
                <img src={url} className="w-24 h-24 object-cover rounded border border-gray-200" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full hover:bg-red-600 cursor-pointer"
                >
                  x
                </button>
              </div>
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
