import React from "react";

const BtnAdd = ({ btnName }) => {
	return (
		<>
			<button
				className="border-[#3a87bb] border px-10 py-2 rounded-2xl text-[#3a87bb] font-medium hover:bg-[#3a87bb] hover:text-white duration-500 ease-in-out shadow-xl"
				type="submit"
			>
				{btnName}
			</button>
		</>
	);
};

export default BtnAdd;
