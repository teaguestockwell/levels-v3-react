dashboard will sub to aircraftsotre.elected air, so that when air changes it re renders.
extra cargo, tanks, and configs will be implmented in seprate component lists

all will push valid cargo state to the cargoStore
extraCargo and configs will imlement the same cargo list. the only diffrence will be the cargo list props as an enum of what cargo categorys that list will render from the cargo store. Also the contets of the card wrapper will be diffent. on config, users will not be able to add cargo, but they will be able to change configs

rm key picks from cargo list subed state, instead of cargoForm render button wih basic info. on click then modal the form.

make cargo store store cargo while they are invalid as strings.
add external validator that is called on each ga