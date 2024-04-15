import React from 'react'
import TopNav from '../components/TopNav'
import { DotBackground } from '../components/dots-background'

export default function Home() {
    return (
        <>
            <div className='h-dvh flex w-full flex-col items-center'>
                <TopNav />
                <DotBackground>
                    <div className="flex flex-col items-center justify-center h-screen">
                        <h1 className="text-6xl tracking-tight font-bold text-neutral-100">Elevate your professional presence</h1>
                        <p className="mt-4 text-lg text-neutral-500 leading-8">Get hired faster and accelerate your career.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" class="rounded-md bg-indigo-800/55 border-2 border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                            <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                </DotBackground>
            </div>
        </>
    )
}
