import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto flex flex-col">
      <ul className="flex items-center justify-between mx-2 my-5">
        <ul>
          <li>
            <h4 className="font-bold">Sell online</h4>
          </li>
          <li>
            <Link href={".."}>Limited edition campaign</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
        </ul>
        <ul>
          <li>
            <h4 className="font-bold">Sell online</h4>
          </li>
          <li>
            <Link href={".."}>Limited edition campaign</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
        </ul>
        <ul>
          <li>
            <h4 className="font-bold">Sell online</h4>
          </li>
          <li>
            <Link href={".."}>Limited edition campaign</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
          <li>
            <Link href={".."}>On demand merch store</Link>
          </li>
        </ul>
      </ul>
      <p className="text-center p-4">
        © 2023 Bonfire.com DMCA Trademark Takedown
      </p>
    </footer>
  );
}
