const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-xl font-bold ml-5">
        Think<span className="text-[#28AD5E]">Nest</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <p className="font-medium text-xs">John Doe</p>
        <div className="w-5 h-5 rounded-full bg-[#28AD5E]" />
      </div>
    </div>
  )
}

export default Header