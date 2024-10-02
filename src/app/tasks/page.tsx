import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import CreateTask from '~/app/_components/createTask';
import SignOut from '../_components/signOut';
import BackgroundCircles from '../_components/backgroundCircles';
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

const navigation = [
    { name: 'Dashboard', href: '/tasks', current: true },
]

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

export default async function TasksPage() {
    const session = (await getServerAuthSession())!;

    return (
        <HydrateClient>
            <div className="min-h-full">


                <BackgroundCircles className="!h-max !-z-10">
                    <div className="bg-gradient-to-r from-primary to-primaryGradient pb-32">
                        <Disclosure as="nav" className="bg-gradient-to-r from-primary to-primaryGradient">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="border-b border-stone-700/75">
                                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="logo.svg"
                                                    width={32}
                                                    height={32}
                                                    priority={false}
                                                    alt="To-do project"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            aria-current={item.current ? 'page' : undefined}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium',
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <h2 className="text-sm text-white mr-4">
                                                    Bienvenue <span className="text-accent">{session.user.name}</span>
                                                </h2>

                                                <SignOut />

                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Open main menu</span>
                                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                            </DisclosureButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DisclosurePanel className="border-b border-gray-700 md:hidden">
                                <div className="flex items-center justify-between space-y-1 px-2 py-3 sm:px-3">
                                    <h2 className="text-center text-sm text-white mr-4 pl-2">
                                        Bienvenue <span className="text-fuchsia-400">{session.user.name}</span>
                                    </h2>
                                    <SignOut />
                                </div>
                                <div className="space-y-1 px-2 py-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                        <header className="py-10">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                            </div>
                        </header>
                    </div>
                </BackgroundCircles>
                {/* </div> */}
                <main className="-mt-32 z-10">
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">

                            <div className="container flex flex-col items-baseline justify-center gap-10 px-5 py-10">
                                <h1 className="text-3xl text-left font-extrabold tracking-tight sm:text-[2rem]">
                                    <span className="text-accent">To-Do</span> project
                                </h1>
                                <div className="mx-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <h2 className="my-3 text-lg">Vous pouvez ajouter une nouvelle tâche à la liste à l&apos;aide du formulaire ci-dessous :</h2>
                                    </div>
                                    <CreateTask />
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </HydrateClient >
    );
}
