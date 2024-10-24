import classNames from "classnames"
import { useState } from "react"

export const FilterTabs = () => {
  const [filter, setFilter] = useState<number | null>(1)

  const filters = [
    { label: 'Un Año', id: 1 },
    { label: 'Un día', id: 2 },
    { label: 'Un Semana', id: 3 },
    { label: 'Un Mes', id: 4 },
  ]


  return (
    <section className="flex gap-2">
      {filters.map((item) => (
        <button
          className={classNames(
            "px-4 py-3 rounded-xl font-semibold text-gray-400 duration-300 transition-all",
            { 'bg-primary-light text-primary-normal': filter === item.id }
          )}
          onClick={() => setFilter(item.id)}
        >
          {item.label}
        </button>
      ))}
    </section>
  )
}