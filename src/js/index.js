(function() {
  console.log("title should be initialized here or whateverrrr")
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),
      $id = document.getElementById.bind(document),
      activeTagName = null,
      $tags = $$('#tags > .tag'),
      $projectsParent = $id('projects'),
      $projects = $$('#projects > .project'),
      $projectTags = $$('.project-tags > .tag'),
      $details = $id('project_details'),
      $title = $id('project_details_title'),
      $description = $id('project_details_description');
      console.log("title: ", $title)

  // TAG SELECTION

  function getTagName($tag) {
    return $tag.classList[1];
  }

  function deactivateTag(tagName) {
    var tagSelector = '#tags > .tag.' + tagName;
    $(tagSelector).classList.remove('active');
    var projectTagSelector = '.project-tags > .tag.' + tagName;
    $$(projectTagSelector).forEach(function($tag) {
      $tag.classList.remove('active');
      var $wrapper = $tag.parentNode.parentNode;
      $wrapper.classList.remove(tagName);
    });
  }

  function activateTag(tagName) {
    console.log("activate Tag!", tagName)
    var tagSelector = '#tags > .tag.' + tagName;
    $(tagSelector).classList.add('active');
    var projectTagSelector = '.project-tags > .tag.' + tagName;
    $$(projectTagSelector).forEach(function($tag) {
      $tag.classList.add('active');
      var $wrapper = $tag.parentNode.parentNode;
      console.log("wrapper: ", $wrapper)
      $wrapper.classList.add(tagName);
    });
  }

  function clearActiveTagName() {
    deactivateTag(activeTagName);
    activeTagName = null;
  }

  function setActiveTagName(tagName) {
    if (activeTagName !== null) {
      deactivateTag(activeTagName);
    }
    activeTagName = tagName;
    activateTag(activeTagName);
  }

  function attachTagListener($tag) {
    var tagName = getTagName($tag);
    $tag.addEventListener('click', function() {
      if (tagName === activeTagName) {
        clearActiveTagName();
      } else {
        setActiveTagName(tagName);
      }
    }, false);
  }

  $tags.forEach(attachTagListener);
  $projectTags.forEach(attachTagListener);

  // DETAILS BOX

  var perRow = 3,
      total = $projects.length;
  function getInsertBeforeIndex(i) {
    var j = (Math.floor(i / 3) + 1) * 3;
    return Math.min(j, total);
  }
  function getOffsetClass(offset) {
    return 'c' + offset + perRow;
  }
  var offsetClasses = [];
  for (var offset = 0; offset < perRow; offset++) {
    offsetClasses.push(getOffsetClass(offset));
  }
  $projects.forEach(function($project, i) {
    
    var j = getInsertBeforeIndex(i);
    console.log("adding listener to each project: ", j, i)
    var offsetClass = getOffsetClass(i % 3);
    $project.addEventListener('click', function() {
      console.log("textContent of project: ", $project.textContent)
      var title = $project.textContent;
      console.log("title: ", title)
      var description = $project.innerText;
      console.log("description: ", description)
      $title.textContent = title;
      $description.innerHTML = description;
      if (j === total) {
        $projectsParent.appendChild($details);
      } else {
        $projectsParent.insertBefore($details, $projects[j]);
      }
      $details.classList.remove('hide');
      $details.classList.remove.apply($details.classList, offsetClasses);
      $details.classList.add(offsetClass);
      $projects.forEach(function($project) {
        $project.classList.remove('selected');
      });
      $project.classList.add('selected');
    }, false);
  });
})();