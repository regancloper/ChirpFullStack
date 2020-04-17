export interface TUsers {
	id?: number;
	username?: string;
	password?: string;
	email?: string;
	_created?: Date;
}

export interface TChirps {
	id?: number;
	userid?: number;
	text?: string;
	location?: string;
	_created?: Date;
}

export interface TMentions {
	chirpid?: number;
	userid?: number
}
