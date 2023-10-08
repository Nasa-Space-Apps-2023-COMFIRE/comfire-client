"use client";
import {useState} from "react";
import {Dialog} from "@headlessui/react";
import {Bars3Icon} from "@heroicons/react/20/solid";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/static/logo.png";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

const navigation = [
    {name: "Home", href: "/"},
    // {name: "Report Fire", href: "/report"},
    // {name: "Get Involved", href: "/get-involved"},
    // {name: "Resources", href: "/resources"},
    {name: "Contact Us", href: "/contact"},
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="inset-x-0 top-0 z-50 flex h-16 absolute">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center gap-x-6">
                        <button
                            type="button"
                            className="-m-3 p-3 md:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                className="h-5 w-5 text-gray-900"
                                aria-hidden="true"
                            />
                        </button>
                        <Link href="/">
                            <Image src={logo} alt="logo" width={60}/>
                        </Link>
                    </div>
                    <nav
                        className="hidden md:flex md:gap-x-2 md:text-sm md:font-semibold md:leading-6 md:text-white">
                        <nav
                            className={`hidden md:flex md:gap-x-2 md:text-sm md:font-semibold md:leading-6`}>
                            {navigation.map((item, itemIdx) => (
                                <Link key={itemIdx} href={item.href}>
                                    <Button variant="link"
                                            className={isHomePage ? "text-white" : ""}>{item.name}</Button>
                                </Link>
                            ))}
                        </nav>
                    </nav>
                    <div className="flex flex-1 items-center justify-end gap-x-8">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/"/>
                        </SignedIn>
                        <SignedOut>
                            {/* Signed out users get sign in button */}
                            <SignInButton mode="modal">
                                <Button variant={"link"} className={isHomePage ? "text-white" : ""}>Sign in</Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-50"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                        <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <Link href="/" className="-ml-0.5">
                                <Image src={logo} alt="logo" width={60}/>
                            </Link>
                        </div>
                        <div className="mt-2 space-y-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    );
}