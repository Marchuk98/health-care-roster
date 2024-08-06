import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns={'http://www.w3.org/2000/svg'}
    width={20}
    height={20}
    ref={ref}
    fill={'none'}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 12h5m0 0h5m-5 0V7m0 5v5"
    />
  </svg>
)

export default memo(forwardRef(SvgComponent))
