import PageSearch from './pageSearch/PageSearch'
import SideListLocations from './sideListLocations/SideListLocations'

function Location() {
  return (
    <div className="w-full bg-background-light dark:bg-background-dark-2">
      <PageSearch />
      <SideListLocations />
    </div>
  )
}

export default Location