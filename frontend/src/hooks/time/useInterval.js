import { useEffect } from "react";

const useInterval = (callback, durationInMs) => {

	useEffect(() => {
		const intervalId = setInterval(() => {
			callback();
		}, durationInMs);

		return () => clearInterval(intervalId);
	}, [callback, durationInMs]);
}

export default useInterval;
