import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
}


export default function Button({ loading, className, children, ...rest }: Props) {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium',
                'bg-gray-900 text-white hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50',
                'disabled:opacity-60 disabled:cursor-not-allowed shadow-sm',
                className,
            )}
            aria-busy={loading || undefined}
            {...rest}
        >
            {children}
        </button>
    )
}