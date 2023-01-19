import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const DashboardNavigator = () => {
  return (
    <Menu as="div" className="relative text-left mt-20 mb-2 mx-auto">
    <div>
        <Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Dashboard Navigations
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 -mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </Menu.Button>
    </div>

    <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
    >
        <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right text-red-500 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <Menu.Item>
                    {() => (
                        <a
                            href="dashboard"
                            className="block px-4 py-2 text-sm text-gray-600"
                        >
                            Account settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="notifications"
                            className={classNames(
                                active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                "block px-4 py-2 text-sm"
                            )}
                        >
                            Notifications
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href=""
                            className={classNames(
                                active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                "block px-4 py-2 text-sm"
                            )}
                        >
                            Settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="editprofile"
                            className={classNames(
                                active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                "block px-4 py-2 text-sm"
                            )}
                        >
                            Edit Profile
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="previewprofile"
                            className={classNames(
                                active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                "block px-4 py-2 text-sm"
                            )}
                        >
                            View Profile
                        </a>
                    )}
                </Menu.Item>
                
            </div>
        </Menu.Items>
    </Transition>
</Menu>
  );
};

export default DashboardNavigator;
