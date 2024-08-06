import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path
        d={
          'm11.717 7.517.766.766-7.55 7.55h-.766v-.766l7.55-7.55Zm3-5.017a.834.834 0 0 0-.584.242l-1.525 1.525 3.125 3.125 1.525-1.525a.83.83 0 0 0 0-1.175l-1.95-1.95a.818.818 0 0 0-.591-.242Zm-3 2.658L2.5 14.375V17.5h3.125l9.217-9.217-3.125-3.125Z'
        }
        fill={'#1A1A1A'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h20v20H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)

export default memo(forwardRef(SvgComponent))
