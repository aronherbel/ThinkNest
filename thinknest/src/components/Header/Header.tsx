const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-3xl font-bold">
        Think<span className="text-green-500">Nest</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <p className="font-medium text-sm">John Doe</p>
        <div className="w-6 h-6 rounded-full bg-green-600" />
      </div>
    </div>
  )
}

export default Header