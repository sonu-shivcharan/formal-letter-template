 function generateSkeletonLoader(skeletonData) {
    // Iterate through the skeletonData array
    const container = document.createElement("div");
    container.classList.add("skeleton-loader");
    skeletonData.forEach((barGroup) => {
      const barContainer = document.createElement("div");
      barContainer.classList.add("bar-container");
  
      // For each bar in the group, create a skeleton-bar div
      barGroup.forEach((barType) => {
        const skeletonBar = document.createElement("div");
        skeletonBar.classList.add("skeleton-bar", barType);
        barContainer.appendChild(skeletonBar);
      });
      container.appendChild(barContainer);
    });
    return container;
  }
  
  export default function addSkelaton(target) {
    const skeletonData = [
      ["short", "short", "short"],
      ["medium", "long", "long"],
      ["long", "long", "long"],
      ["long", "long", "long"],
      ["long", "long", "long"],
      ["short", "short", "short"],
    ];
    const prevSkeleton = document.querySelector(".skeleton-loader");
    if (prevSkeleton) return prevSkeleton;
    const skeleton = generateSkeletonLoader(skeletonData);
  
    target.appendChild(skeleton);
    return skeleton;
  }
  