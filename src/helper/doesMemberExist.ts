interface Member{
    memberId: string,
    joinedAt: Date;
}

export const doesMemberExist = (Members: Member[], memberId: string): boolean =>{
    return Members.some((member) => member.memberId.toString() === memberId.toString());
}