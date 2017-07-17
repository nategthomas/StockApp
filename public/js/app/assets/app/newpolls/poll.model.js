var Poll = (function () {
    function Poll(title, options, user, pollid, votes) {
        this.title = title;
        this.options = options;
        this.user = user;
        this.pollid = pollid;
        this.votes = votes;
    }
    return Poll;
}());
export { Poll };
