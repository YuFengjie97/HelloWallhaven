import * as cookie from 'cookie'

const cook =`XSRF-TOKEN=eyJpdiI6IlBoTlI5Zk9sZFBuTHlDcVJXaUtlWWc9PSIsInZhbHVlIjoia0VFWW1xcWhvb0QydGFMWGc0bUgwYjJnb3AwMlpyY0ZcL1Nmb091YzZhYmgrMjhzWktLT1VrOUdwT0JRWW9yZ28iLCJtYWMiOiI1ZTdmZWIwNWEzMDllMGU4NWFhODk2MmE0YTY1MWY4ZmIyYTg2OWY5NWUwNTExOTdmZGY2MGUyOWJiMWIwN2FmIn0%3D; expires=Mon, 13-Jan-2025 05:14:55 GMT; Max-Age=7200; path=/; secure; samesite=strict;wallhaven_session=eyJpdiI6IkxpM3V6bmFvNHJzS3dOYWFMNFo0TEE9PSIsInZhbHVlIjoicFYxOUdndXcxTVRNVnJjWVNOTnlNajhTV1E2OWt2M2psWDFxOEN5UENWamE1YXNUQmxMY2R0R2NyVk5ZN3hKRCIsIm1hYyI6IjRmMDBhM2RkODM1ZGEwZmQ4NzI3ZDBkODg3YTY1NjEyZmNlYjQwMTQ3MTgwYzk2NDQ5YzZiOGVhMzdhNjZiM2MifQ%3D%3D; expires=Mon, 13-Jan-2025 05:14:55 GMT; Max-Age=7200; path=/; secure; httponly; samesite=strict`
const cook2 = 'name=JohnDoe; theme=dark; sessionToken=abc123'
console.log(cookie.parse(cook));

