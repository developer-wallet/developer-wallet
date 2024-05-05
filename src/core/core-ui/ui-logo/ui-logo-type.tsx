import logoType from '/logotype.svg'

export interface UiLogoTypeProps {
  height?: number
  width?: number
}
export function UiLogoType(props: UiLogoTypeProps = {}) {
  return <img src={logoType} alt="logo" {...props} />
}
