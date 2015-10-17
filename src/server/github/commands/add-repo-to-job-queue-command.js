/**
 * Add the given org/repo combination to the job queue
 */
AddRepoToJobQueueCommand = (function () {
  /**
   * Add the given organization/user and repo combination
   * to the job queue. New jobs are normally automatically put
   * at the beginning of the queue (ie, new jobs have priority
   * to be run first). You can change this behaviour by
   * passing in an optional lastRunTimestamp which will
   * put the job in its real order.
   *
   * @param orgName String the organization or user name
   * @param repoName String the repo name
   * @param lastRanTimestamp Number Optional defaults 0
   */
  var handle = function (orgName, repoName, lastRanTimestamp) {
    lastRanTimestamp = lastRanTimestamp || 0;
    JobQueue.insert({
      orgName: orgName,
      repoName: repoName,
      type: 'github',
      action: 'repo',
      recurring: true,
      lastRanTimestamp: lastRanTimestamp
    });
  };

  return {
    handle: handle
  }
});
