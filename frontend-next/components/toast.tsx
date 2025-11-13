"use client"
import { toast as toasty } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';

import type { ReactNode } from 'react'

const Link = ({
    children,
    action
}: {
    children: string
    action?: () => void
}) => {
    return (
        <div
            className="text-surface-action-primary flex w-full justify-end p-1 font-bold"
            onClick={action}
        >
            {children}
        </div>
    )
}
const Toaster = ({
    closeToast,
    children,
    link,
    action
}: {
    closeToast: () => void
    children: string | ReactNode
    link?: string
    action?: () => void
}) => (
    <div className="flex size-full">
        <div className={`${link ? 'ml-[16px]' : ''} flex w-full items-center`}>
            <p>{children}</p>
            {link && <Link action={action}>{link}</Link>}
        </div>
        <div className={`flex ${link ? 'mb-[5px] items-end' : 'items-center'}`}>
            <div
                onClick={closeToast}
                className="flex size-[24px] cursor-pointer items-center justify-center"
            >
                <div className="flex cursor-pointer justify-center">
                    <CloseIcon/>
                </div>
            </div>
        </div>
    </div>
)

const toast = {
    success: (message: string | ReactNode) => {
        toasty(
            ({ closeToast }) => (
                <Toaster closeToast={closeToast}>{message}</Toaster>
            ),
            {
                position: 'bottom-right',
                className:
                    '!bg-green-500 !text-default m-0 p-5 items-center',
                hideProgressBar: true,
                closeButton: false,
                autoClose: 5000
            }
        )
    },
    info: (message: string | ReactNode) => {
        toasty(
            ({ closeToast }) => (
                <Toaster closeToast={closeToast}>{message}</Toaster>
            ),
            {
                position: 'bottom-right',
                className:
                    '!bg-white !text-default m-0 p-5 items-center',
                hideProgressBar: true,
                closeButton: false,
                autoClose: 5000
            }
        )
    },
    warning: (message: string | ReactNode) => {
        toasty(
            ({ closeToast }) => (
                <Toaster closeToast={closeToast}>{message}</Toaster>
            ),
            {
                position: 'bottom-right',
                className:
                    '!bg-surface-yellow-500 !text-default m-0 p-5 items-center',
                hideProgressBar: true,
                closeButton: false,
                autoClose: 5000
            }
        )
    },

    error: (
        message: string | ReactNode,
        link?: string,
        action?: () => void,
        autoClose?: number
    ) => {
        toasty(
            ({ closeToast }) => (
                <Toaster closeToast={closeToast} action={action} link={link}>
                    {message}
                </Toaster>
            ),
            {
                position: 'bottom-right',
                className: `!bg-red-500 !text-default p-5 m-0 h-[${link ? '100px' : '48px'}] items-center`,
                hideProgressBar: true,
                closeButton: false,
                autoClose: autoClose || false
            }
        )
    }
}

export { toast }
