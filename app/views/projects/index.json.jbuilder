json.array!(@projects) do |project|
  json.extract! project, :id
  json.name project.name
  json.img_url project.img_url
  json.video_url project.video_url
  json.description project.description
end
