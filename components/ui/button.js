import Link from 'next/Link'

import classes from './button.module.css'

export default function Button(props) {
  return (
    <Link href={props.link}>
      <a className={classes.btn}>
        {props.children}
      </a>
    </Link>
  )
}