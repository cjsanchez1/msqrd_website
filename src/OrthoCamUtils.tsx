export interface CalcOrthoCamZoomProps{
    orthoCamInitZoom: number
    orthoCamGoodWidthAspect: number
    orthoCamGoodHeightAspect: number
    heighTransitionThreshold: number
}

export const calcOrthoCamZoomDefaultSettings : CalcOrthoCamZoomProps = {
  orthoCamInitZoom: 100, 
  orthoCamGoodWidthAspect: 0.65,
  orthoCamGoodHeightAspect: 0.2, 
  heighTransitionThreshold: 1.6
}

export function calcOrthoCamZoom (
  { orthoCamInitZoom = 100, 
    orthoCamGoodWidthAspect = 0.65, 
    orthoCamGoodHeightAspect = 0.2,
    heighTransitionThreshold = 1.6 } : CalcOrthoCamZoomProps
  ) : number
{ 
  const windowWidth  = window.innerWidth
  const windowHeight = window.innerHeight
  const widthAspect  = windowWidth / windowHeight;
  const heightAspect = windowHeight / windowWidth;
  const finalMult = widthAspect < heighTransitionThreshold ? (widthAspect / orthoCamGoodWidthAspect) : (heightAspect / orthoCamGoodHeightAspect);
  return orthoCamInitZoom * finalMult;
}
