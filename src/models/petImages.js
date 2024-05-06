import unselectedDog from '../assets/unselectedDog.png';
import selectedDog from '../assets/selectedDog.png';
import unselectedCat from '../assets/unselectedCat.png';
import selectedCat from '../assets/selectedCat.png';
import unselectedBird from '../assets/unselectedBird.png';
import selectedBird from '../assets/selectedBird.png';
import unselectedRabbit from '../assets/unselectedRabbit.png';
import selectedRabbit from '../assets/selectedRabbit.png';
import unselectedReptile from '../assets/unselectedReptile.png';
import selectedReptile from '../assets/selectedReptile.png';
import unselectedOther from '../assets/unselectedOther.png';
import selectedOther from '../assets/selectedOther.png';
import unselectedMale from '../assets/unselectedMale.png';
import selectedMale from '../assets/selectedMale.png';
import unselectedFemale from '../assets/unselectedFemale.png';
import selectedFemale from '../assets/selectedFemale.png';

export const petImages = [
    {type: 'dog', selected: selectedDog, unselected: unselectedDog},
    {type: 'cat', selected: selectedCat, unselected: unselectedCat},
    {type: 'bird', selected: selectedBird, unselected: unselectedBird},
    {type: 'rabbit', selected: selectedRabbit, unselected: unselectedRabbit},
    {type: 'reptile', selected: selectedReptile, unselected: unselectedReptile},
    {type: 'other', selected: selectedOther, unselected: unselectedOther},
]

export const petGenderImages = [
    {type: 'Male', selected: selectedMale, unselected: unselectedMale},
    {type: 'Female', selected: selectedFemale, unselected: unselectedFemale},
]