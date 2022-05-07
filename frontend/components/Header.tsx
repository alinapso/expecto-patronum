import Link from "next/link";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { RemoteApiCall } from "lib/remoteAPI";
import { logout } from "lib/auth";

export default function Header() {
  const { user, mutate } = useUser();
  console.log(user);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!user && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {user && (
            <>
              {console.log(`user is ${JSON.stringify(user, null, 2)}`)}
              <li>
                <Link href="/profile-sg">
                  <a>
                    <span
                      style={{
                        marginRight: ".3em",
                        verticalAlign: "middle",
                        borderRadius: "100%",
                        overflow: "hidden",
                      }}
                    ></span>
                    Profile (Static Generation, recommended)
                  </a>
                </Link>
              </li>

              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    logout();
                    mutate();
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <a href="https://github.com/vvo/iron-session">
              <Image
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
                alt=""
              />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
}
