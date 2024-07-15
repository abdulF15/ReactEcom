function TopBar() {
  return (
    <div className="hidden lg:flex w-full h-8  items-center bg-slate-300  top-0 ">
      <div className="container mx-auto">
        <ul className="menu menu-horizontal rounded-box float-right">
          <li>
            <a>About us</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Help</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopBar;
