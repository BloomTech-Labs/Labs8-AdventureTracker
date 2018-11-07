import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Trips</a>
        </Link>
        <Link href="/billings">
          <a style={linkStyle}>Billings</a>
        </Link>
        <Link href="/settings">
          <a style={linkStyle}>Settings</a>
        </Link>
    </div>
)

export default Header