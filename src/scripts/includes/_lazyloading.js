import lozad from 'lozad'

const observer = lozad('.lozad', {loaded: ()=>console.log('зуй')}); // lazy loads elements with default selector as '.lozad'
observer.observe();