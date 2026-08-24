import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, X, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CategoryIcon from '../components/CategoryIcon'
import Stamp, { statusTone, priorityTone } from '../components/Stamp'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CircleMarker } from "react-leaflet";

const DOT_COLORS = {
  brick: "#B94A3B",
  civic: "#1F4A4E",
  forest: "#2E7D4F",
  marigold: "#d17c1b",
  gold: "#BC9226",
};






export default function CommunityMap() {
  const { complaints } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = useMemo(
    () => complaints.filter((c) => activeCategory === 'all' || c.category === activeCategory),
    [complaints, activeCategory],
  )

  return (
    <div>
      <PageHeader
        eyebrow="Community issues"
        title="What's been reported near you"
        description="A city-wide view of civic reports. Filter by category, and select a marker for details."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              activeCategory === 'all' ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
            }`}
          >
            All issues
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                activeCategory === c.id ? 'border-civic-600 bg-civic-50 text-civic-700 dark:bg-civic-700 dark:text-paper-50' : 'border-paper-300 text-paper-600 dark:border-civic-600 dark:text-paper-300'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: DOT_COLORS[c.color] }} />
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          
          
          
          <MapContainer
            className="lg:col-span-2"
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
               height: "520px",
                width: "100%",
               borderRadius: "12px",
            }}
            className="lg:col-span-2"
          >
 <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution="&copy; OpenStreetMap &copy; CARTO"
/>
  {visible.map((c) => (
    <CircleMarker
  key={c.id}
  center={[c.location.lat, c.location.lng]}
  radius={8}
  pathOptions={{
    color:
      c.category === "road"
        ? "red"
        : c.category === "water"
        ? "blue"
        : c.category === "sanitation"
        ? "green"
        : c.category === "lighting"
        ? "orange"
        : c.category === "drainage"
        ? "purple"
        : "black",
    fillColor:
      c.category === "road"
        ? "red"
        : c.category === "water"
        ? "blue"
        : c.category === "sanitation"
        ? "green"
        : c.category === "lighting"
        ? "orange"
        : c.category === "drainage"
        ? "purple"
        : "black",
    fillOpacity: 0.9,
  }}
  eventHandlers={{
    click: () => setSelected(c),
  }}
>
  <Popup>
    <b>{c.title}</b>
    <br />
    {c.location.area}
  </Popup>
</CircleMarker>
  ))}
</MapContainer>

            
          

          <div>
            {selected ? (
              <div className="surface animate-rise-in p-5">
                <div className="flex items-start justify-between gap-2">
                  <CategoryIcon categoryId={selected.category} size={18} />
                  <button onClick={() => setSelected(null)} className="text-paper-400 hover:text-paper-600" aria-label="Close">
                    <X size={16} />
                  </button>
                </div>
                <p className="mt-2 font-mono text-xs text-paper-500">{selected.id}</p>
                <h3 className="mt-0.5 font-display text-base font-semibold text-ink dark:text-paper-50">{selected.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-paper-500"><MapPin size={12} /> {selected.location.area}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Stamp label={selected.status} tone={statusTone(selected.status)} />
                  <Stamp label={`${selected.priority} priority`} tone={priorityTone(selected.priority)} />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-paper-600 dark:text-paper-300">
                  <Users size={14} /> {selected.supportCount} citizens support this
                </p>
                <Link to={`/track/${selected.id}`} className="btn-primary mt-4 w-full">
                  View full details <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="surface flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-paper-500">
                <MapPin size={22} />
                <p className="text-sm">Select a marker to see complaint details.</p>
              </div>
            )}

            <div className="surface mt-4 p-4">
              <p className="text-xs font-medium text-paper-500">Showing</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-paper-50">{visible.length}</p>
              <p className="text-xs text-paper-500">reported issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
