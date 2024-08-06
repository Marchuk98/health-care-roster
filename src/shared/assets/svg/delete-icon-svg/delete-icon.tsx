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
          'M13.333 7.5v8.333H6.667V7.5h6.666Zm-1.25-5H7.917l-.834.833H4.167V5h11.666V3.333h-2.916l-.834-.833ZM15 5.833H5v10c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667v-10Z'
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
