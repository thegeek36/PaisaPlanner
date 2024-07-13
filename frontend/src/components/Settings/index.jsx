import SideNav from '../SideNav';

const Settings = () => {
    return (
        <SideNav>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Settings</h2>
            {/* Add your settings content here */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-600">Settings content goes here.</p>
            </div>
        </SideNav>
    );
};

export default Settings;
