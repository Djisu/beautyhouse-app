function tryBinarySearch(nums, target) {
     let floorIndex = 0
	 let ceilingIndex = nums.length - 1
	 
	 while (ceilingIndex > floorIndex + 1){
		 let distance = ceilingIndex - floorIndex
		 let halfDistance = Math.floor((distance) / 2)
		 let guessIndex = floorIndex + halfDistance
		 let guessValue = nums[guessIndex]
		 
		 if (target == guessValue){
			 return true
		 }
		 
		 if (guessValue < target  ){
			 floorIndex = guessIndex
		 }else {
			 ceilingIndex = guessIndex
		 }
	 }
	 return false
}

console.log(tryBinarySearch([2,4,6,1,5,3, 7], 3))

























/* function binarySearchNew(target, nums){
	let floorIndex = -1
	let ceilingIndex = num.length - 1
	
	while (ceilingIndex > floorIndex + 1){
		let distance = ceilingIndex - floorIndex
		let halfDistance = Math.floor(distance / 2)		
		let guessIndex = floorIndex + halfDistance
		
		let guessValue = nums[guessIndex]
		
		if (guessValue == target){
			return true
		}
		
		if (guessValue < target){
			floorIndex = guessIndex
		}else{
			ceilingIndex == guessIndex
		}
	}
	return false
}
 */