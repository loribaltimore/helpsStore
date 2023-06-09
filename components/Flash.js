"use client"
import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Flash({ flash }) {
    const [show, setShow] = useState(true);
    const { data: session, update } = useSession();

    return (
        <>
            {
                show && flash ?
                flash.type === 'success'?
                    //Success Flash
                    <div className="rounded-md bg-green-50 p-4 w-1/2 mx-auto mb-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{flash.message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                onClick={() => {
                    setShow(false);
                    update({ flash: null })
                }}
                 >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
                    :
                //Error Flash
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{flash.message}</h3>
          <div className="mt-2 text-sm text-red-700">
          </div>
        </div>
      </div>
    </div> : null
            }
</>
  )};