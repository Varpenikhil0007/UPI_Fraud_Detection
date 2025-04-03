import Link from "next/link"
import { Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="text-xl font-bold mb-4">Jagruk</div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe size={16} />
              <select className="bg-transparent border-none text-sm focus:outline-none">
                <option value="en">United States (English)</option>
                <option value="fr">France (Français)</option>
                <option value="de">Germany (Deutsch)</option>
                <option value="jp">Japan (日本語)</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Team</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Aryan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Jatin
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Anurag
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Nikhil
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-white">
                  Sigma
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Atlas
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">College</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="https://pravaraengg.org.in/" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://pravaraengg.org.in/it.html" className="hover:text-white">
                  Department
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Mentor
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-white">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy
                </Link> */}
              {/* </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-wrap justify-between">
          <div>©varpeNS.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            {/* <Link href="#" className="hover:text-white">
              Cookies
            </Link>
            <Link href="#" className="hover:text-white">
              Sitemap
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

