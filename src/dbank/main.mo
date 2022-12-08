import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
	stable var balance : Float = 100;
	var startTime = Time.now();

	public func topUp(amount : Float) {
		balance += amount;
	};

	public func withdraw(amount : Float) {
		if (balance - amount >= 0) {
			balance -= amount;
		};
	};

	public query func checkBalance() : async Float {
		return balance;
	};

	public func compound() {
		let currentTime = Time.now();
		let elapsedNanoSeconds = currentTime - startTime;
		let elapsedSeconds = elapsedNanoSeconds / 1000000000;
		balance := balance * (1.01 ** Float.fromInt(elapsedSeconds));
		startTime := currentTime;
	};
};
