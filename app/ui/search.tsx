'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {

  // URLSearchParams is a WebAPI that deconstructs params string like ?page=1&query=a
  const searchParams = useSearchParams();
  // usePathname gets current path, eg "/dashboard/invoices".
  const pathname = usePathname();
  // replace performs client side navigation programmatically
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // reset page number to 1
    params.set('page', '1');
    // set params based on input, or delete if empty
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // updates URL with search term
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value)}}
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
