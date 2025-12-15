import React from 'react';
import { X, Instagram, Facebook, SendIcon } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import Link from 'next/link';

export function FooterSection() {
    return (
        <footer className="bg-white bg-opacity-10 backdrop-blur-md  pb-10 md:px-12 ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
                    <p>© 2025 AssumeChat. All rights reserved.</p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:underline">Terms of Service</Link>
                        <Link href="#" className="hover:underline">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
