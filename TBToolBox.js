/***************************
*		Standard ToolBox Library
***************************/
		var $TB = new Object();
/***************************
*		Connect Mouse
***************************/
		$TB.Mouse = new Object();
		$TB.Mouse.X = -1;
		$TB.Mouse.Y = -1;
		$TB.Mouse.Left = false;
		$TB.Mouse.Middle = false;
		$TB.Mouse.Right = false;

		document.addEventListener("mouseup", function(event)
				{
				switch(event.buttons)
						{
						case 0:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = false;
								break;
						case 1:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = false;
								break;
						case 2:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = true;
								break;
						case 3:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = true;
								break;
						case 4:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = false;
								break;
						case 5:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = false;
								break;
						case 6:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = true;
								break;
						case 7:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = true;
								break;
						default:
								break;
						}
				});
		document.addEventListener("mousedown", function(event)
				{
				switch(event.buttons)
						{
						case 0:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = false;
								break;
						case 1:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = false;
								break;
						case 2:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = true;
								break;
						case 3:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = false;
								$TB.Mouse.Right = true;
								break;
						case 4:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = false;
								break;
						case 5:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = false;
								break;
						case 6:
								$TB.Mouse.Left = false;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = true;
								break;
						case 7:
								$TB.Mouse.Left = true;
								$TB.Mouse.Middle = true;
								$TB.Mouse.Right = true;
								break;
						default:
								break;
						}
				});
		document.addEventListener("mousemove", function(event)
				{
				$TB.Mouse.X = event.pageX;
				$TB.Mouse.Y = event.pageY;
				});
		window.addEventListener("blur", function()
				{
				$TB.MouseX = -1;
				$TB.MouseY = -1;

				$TB.Mouse.Left = false;
				$TB.Mouse.Middle = false;
				$TB.Mouse.Right = false;
				});
/***************************
*		scrollbarWidth
***************************/
		$TB.SBarWidth = function()
				{
				var ODiv = document.createElement('div');
				ODiv.style.top = "0px";
				ODiv.style.left = "0px";
				ODiv.style.width = "200px";
				ODiv.style.height = "150px";
				ODiv.style.position = "absolute";
				ODiv.style.visibility = "hidden";
				ODiv.style.overflow = "hidden";
				document.getElementsByTagName("body")[0].appendChild(ODiv);

				var IDiv = document.createElement('div');
				IDiv.style.width = "100%";
				IDiv.style.height = "200px";
				ODiv.appendChild(IDiv);

				var width1 = IDiv.offsetWidth;
				ODiv.style.overflow = "scroll";

				var width2 = ODiv.clientWidth;
				document.getElementsByTagName("body")[0].removeChild(ODiv);

				return (width1 - width2);
				};
		$TB.ScrollBarWidth = "10px";
/***************************
*		Enable Resize
***************************/
		window.addEventListener("resize", function(e)
				{
				if(e.target === window)
						{
						$TB.WindowResize();
						}
				});

		$TB.WindowResize = function()
				{
				$TB.ScrollBarWidth = $TB.SBarWidth();
				document.dispatchEvent($TB.CssRefresh);
				};

		var TBready = setInterval(function()
					{
					if (document.readyState === 'complete')
							{
							clearInterval(TBready);
							$TB.WindowResize();
							}
					}, 10);
/***************************
*		CSS
***************************/
		$TB.Css = new Object();
		$TB.Css.get = function(Obj, Property)
				{
				return window.getComputedStyle(Obj).getPropertyValue(Property).trim();
				}
		$TB.Css.stringify = function(StyleObj)
				{
				var StyleText = "";
				for(var Key in StyleObj)
						{
						var Field = Key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

						StyleText = StyleText + Field + ": " + StyleObj[Key] + "; "
						}
				return StyleText;
				}
		$TB.Css.parse = function(StyleText)
				{
				var regex = /([\w-]*)\s*:\s*([^;]*)/g;
				var match;
				var StyleObj = {};
				while(match = regex.exec(StyleText))
						{
						var Field = match[1];
						Field = Field.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

						StyleObj[Field] = match[2].trim();
						}
				return StyleObj;
				}
		$TB.CssRefresh = new CustomEvent("CssRefresh", {detail: {}, bubbles: false, cancelable: false});
/***************************
*	TB_ComboBox
***************************/
class TB_ComboBox extends HTMLElement
		{
		constructor()
				{
				/***************************
				*	Super
				***************************/
						super();
				/***************************
				*	Varibles
				***************************/
						var ObjTemp = this;
						var Iwidth = 100;
						var Iheight = 10;
						var Idropheight = 50;
						var Ikey = null;
						var Ivalue = "";
						var Ilistposition = -1;
						var Ilistid = 0;
						var listValve = "";
						var Itext = "";
						var Itemptext = "";
						var Ifocused = false;
						var Iempty = true;
						var Ileaveable = true;
						var Imove1;
						var Iopenning = false;
						var Ifiltertest;
						var Iobserver;
						var tbDirection;
						ObjTemp.Loaded = false;

						ObjTemp._appendChild = ObjTemp.appendChild;
						ObjTemp._insertBefore = ObjTemp.insertBefore;

						ObjTemp.change = function(event)
								{
								var tEvent = new CustomEvent("change", {detail: {}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};

						ObjTemp.input = function(event)
								{
								var tEvent = new CustomEvent("input", {detail: {}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};

						ObjTemp.List = new Array();
						ObjTemp.options = new Object();
				/***************************
				*	Structure
				***************************/
						/***************************
						*	Frame
						***************************/
								ObjTemp.addEventListener("blur", function(event)
										{
										if(Ileaveable)
												{
												if(tbInput.value.length == 0)
														{
														Iempty = true;
														tbInput.value = Itemptext;

														ObjTemp.setAttribute('empty', '');
														}
												ObjTemp.removeAttribute('focus');
												}
										else
												{
												event.stopImmediatePropagation();
												event.preventDefault();
												}
										}, false);
								ObjTemp.addEventListener("focus", function(event)
										{
										if(Iempty)
												{
												Iempty = false;
												tbInput.value = "";
												ObjTemp.removeAttribute('empty');
												}
										ObjTemp.setAttribute('focus', '');
										}, false);
								ObjTemp.addEventListener("mouseenter", function(event)
										{
										Ileaveable = true;

										if(!ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.setAttribute('hover', '');
												}
										else
												{
												event.stopImmediatePropagation();
												event.preventDefault();
												}
										}, false);
								ObjTemp.addEventListener("mouseleave", function(event)
										{
										if(Ileaveable)
												{
												if(ObjTemp.hasAttribute('hover'))
														{
														HideDropBox();

														ObjTemp.removeAttribute('hover');
														}
												}
										else
												{
												event.stopImmediatePropagation();
												event.preventDefault();
												}
										}, false);
								ObjTemp.addEventListener("keydown", function(event)
										{
										switch(event.keyCode)
												{
												case 13:	/* enter */
													if(tbDropbox.style.visibility == "inherit")
															{
															if(Ilistposition in ObjTemp.List)
																	{
																	ObjTemp.key = ObjTemp.List[Ilistposition];
																	}
															else
																	{
																	ObjTemp.value = tbInput.value;
																	}
															}
													break;

												case 9: 	/* tab */
													ObjTemp.value = tbInput.value;
													break;

												case 38:	/* up */
													if(tbDropbox.style.visibility == "inherit")
															{
															ObjTemp.ListPosition = Ilistposition - 1;
															}
													break;

												case 40:	/* down */
													if(tbDropbox.style.visibility == "inherit")
															{
															ObjTemp.ListPosition = Ilistposition + 1;
															}
													break;

												default:
													tbInput.focus();
													break;
												}
										}, false);
						/***************************
						*	ShadowRoot
						***************************/
								var ShadowRoot = this.attachShadow({mode: 'open', delegatesFocus: true});
								ShadowRoot.innerHTML = "".concat("<style>",
														":host",
																"{",
																"height: 20px;",
																"width: 100px;",
																"margin: 0px;",
																"position: absolute;",
																"display: block;",
																"cursor: text;",
																"text-align: left;",
																"font-size: 12px;",
																"font-family: 'Times New Roman';",
																"color: #000000;",
																"background-color: #FFFFFF;",
																"border: 1px solid #000000;",
																"outline: none;",
																"overflow: hidden;",
																"padding: 0px;",
																"--tbDropHeight: 100px;",
																"--tbPaddingLeft: 12px;",
																"--tbScrollBar_width: 20px;",
																"--tbScrollBar_height: 20px;",
																"--tbUpButton: var(--imgUpButton);",
																"--tbVButton: var(--imgVButton);",
																"--tbDownButton: var(--imgDownButton);",
																"--tbArrow: var(--imgDownButton);",
																"--tbArrowFill: #041FD3;",
																"--tbDirection: auto;",
																"}",
														":host([empty])",
																"{",
																"color: #CCCCCC;",
																"}",
														":host([disabled])",
																"{",
																"pointer-events: none;",
																"cursor: inherit;",
																"}",
														":host([readonly])",
																"{",
																"background-color: #AAAAAA;",
																"}",
														"#tbFog",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 100%;",
																"width: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-color: #000000;",
																"opacity: 0.5;",
																"display: none;",
																"}",
														":host([disabled]) #tbFog",
																"{",
																"display: inherit;",
																"}",
														"#tbArrow",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 100%;",
																"width: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"cursor: pointer;",
																"background-image: var(--tbArrow);",
																"background-repeat: no-repeat;",
																"background-size: contain;",
																"background-position: right;",
																"background-color: var(--tbArrowFill);",
																"}",
														"#tbInput",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 100%;",
																"margin: 0px;",
																"padding-left: var(--tbPaddingLeft);",
																"padding-top: 0px;",
																"padding-bottom: 0px;",
																"position: absolute;",
																"overflow: hidden;",
																"border: none;",
																"outline: none;",
																"color: inherit;",
																"background-color: inherit;",
																"cursor: inherit;",
																"text-align: inherit;",
																"font-family: inherit;",
																"font-size: inherit;",
																"}",
														"#tbDropbox",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 1px;",
																"margin: 0px;",
																"position: absolute;",
																"border-left: 1px outset #000000;",
																"border-right: 1px outset #000000;",
																"background-color: #FFFFFF;",
																"visibility: hidden;",
																"display: flex;",
																"flex-flow: column nowrap;",
																"--tbOverflow: auto;",
																"--tbScrollBar_width: inherit;",
																"--tbScrollBar_height: inherit;",
																"--tbUpButton: inherit;",
																"--tbVButton: inherit;",
																"--tbDownButton: inherit;",
																"}",
														":host([open]) #tbDropbox",
																"{",
																"z-index: 99999;",
																"}",
														"</style>",
														"<tb-div id = 'tbDropbox'><slot id = 'ComboSlot' name = 'ComboSlot' slot = 'DivSlot'></slot></tb-div>",
														"<div id = 'tbArrow'></div>",
														"<input id = 'tbInput' type = 'text'></input>",
														"<div id = 'tbFog'></div>",
														"");
						/***************************
						*	tbInput
						***************************/
								var tbInput = ShadowRoot.getElementById("tbInput");
								tbInput.addEventListener("focus", function(event)
										{
										if(ObjTemp.disabled)
												{
												tbInput.blur();
												}
										}, false);
								tbInput.addEventListener("change", function(event)
										{
										if(Ileaveable)
												{
												ObjTemp.value = tbInput.value;
												}
										}, false);
								tbInput.addEventListener("input", function(event)
										{
										if((tbInput.value.length > 0) && (ObjTemp.hasAttribute('autocomplete')))
												{
												if((tbInput.value.substring(0, listValve.length) != listValve) || (listValve.length == 0))
														{
														ObjTemp.List = resetList();
														}
												Filter(ObjTemp.List, "^" + tbInput.value);
												listValve = tbInput.value;

												if(ObjTemp.List.length != 0)
														{
														if(!ObjTemp.hasAttribute('open'))
																{
																ObjTemp.ListPosition = 0;
																}

														ShowDropBox();
														}
												else
														{
														HideDropBox();
														}
												}
										else
												{
												HideDropBox();
												}

										ObjTemp.input();
										}, false);
						/***************************
						*	tbArrow
						***************************/
								var tbArrow = ShadowRoot.getElementById("tbArrow");
								tbArrow.addEventListener("mousedown", function(event)
										{
										if(tbDropbox.style.visibility == "inherit")
												{
												HideDropBox();
												}
										else
												{
												ObjTemp.List = resetList();
												Filter(ObjTemp.List, "*");
												ShowDropBox();
												}
										}, false);
						/***************************
						*	tbDropbox
						***************************/
								var tbDropbox = ShadowRoot.getElementById("tbDropbox");
								tbDropbox.addEventListener("mouseleave", function(event)
										{
										event.stopImmediatePropagation();
										event.preventDefault();
										}, false);
				/***************************
				*	Properties
				***************************/
						Object.defineProperties(ObjTemp, {
							"autocomplete": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('autocomplete');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('autocomplete', '');
												}
										else
												{
												ObjTemp.removeAttribute('autocomplete');
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"autoRefresh":	{
									"get": function()
										{
										return Irefresh;
										},
									"set": function(val)
										{
										if(val)
												{
												tbDropbox.autoRefresh = true;
												}
										else
												{
												tbDropbox.autoRefresh = false;
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"disabled": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('disabled');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('disabled', '');
												}
										else
												{
												ObjTemp.removeAttribute('disabled');
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"readOnly": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('readonly');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('readonly', '');
												tbInput.readOnly = true;
												tbArrow.style.pointerEvents = "none";

												HideDropBox();
												}
										else
												{
												ObjTemp.removeAttribute('readonly');
												tbInput.readOnly = false;
												tbArrow.style.pointerEvents = "auto";
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"defaultText":			{
											configurable: false,
											"get": function()
													{
													return Itemptext;
													},
											"set": function(val)
													{
													Itemptext = val;
													if(!ObjTemp.hasAttribute('focus') && ObjTemp.hasAttribute('empty'))
															{
															tbInput.value = Itemptext;
															}
													}
											}
							});
						Object.defineProperties(ObjTemp, {
							"ListId":			{
											configurable: false,
											"get": function()
													{
													return Ilistid;
													},
											"set": function(val)
													{
													if(val in ObjTemp.options)
															{
															ObjTemp.ListPosition = ObjTemp.List.indexOf(val.toString());
															}
													}
											}
							});
						Object.defineProperties(ObjTemp, {
							"ListPosition": 			{
											configurable: false,
											"get": function()
													{
													return Ilistposition;
													},
											"set": function(val)
													{
													if(Ilistid in ObjTemp.options)
															{
															ObjTemp.options[Ilistid].selected = false;
															}

													if(ObjTemp.List.length != 0)
															{
															if(val > (ObjTemp.List.length - 1))
																	{
																	Ilistposition = 0;
																	}
															else if(val < 0)
																	{
																	Ilistposition = ObjTemp.List.length - 1;
																	}
															else
																	{
																	Ilistposition = val;
																	}

															Ilistid = ObjTemp.List[Ilistposition];
															ObjTemp.options[Ilistid].selected = true;

															var tTop = ObjTemp.options[Ilistid].offsetTop;
															var tHeight = ObjTemp.options[Ilistid].offsetHeight;
															var sTop = tbDropbox.tbScrollTop;

															if((tTop - sTop) < 0)
																	{
																	tbDropbox.tbScrollTop = tTop;
																	}
															else if(((tTop + tHeight) - sTop) > Idropheight)
																	{
																	tbDropbox.tbScrollTop = (tTop + tHeight) - Idropheight;
																	}
															}
													else
															{
															Ilistposition = -1;
															}
													}
											}
							});
						Object.defineProperties(ObjTemp, {
							"key":			{
											configurable: false,
											"get": function()
													{
													return Ikey;
													},
											"set": function(val)
													{
													var Ioldkey = Ikey;

													if(val in ObjTemp.options)
															{
															Iempty = false;
															ObjTemp.removeAttribute('empty');

															tbInput.value = ObjTemp.options[val].value;
															Ivalue = ObjTemp.options[val].value;
															Ikey = val;
															}
													else
															{
															Iempty = true;
															if(!ObjTemp.hasAttribute('focus'))
																	{
																	ObjTemp.setAttribute('empty', '');
																	tbInput.value = Itemptext;
																	}
															else
																	{
																	tbInput.value = "";
																	}
															Ivalue = "";
															Ikey = null;
															}

													HideDropBox();

													if(Ioldkey != Ikey)
															{
															ObjTemp.change();
															}
													}
											}
							});
						Object.defineProperties(ObjTemp, {
							"value":			{
											configurable: false,
											"get": function()
													{
													return Ivalue;
													},
											"set": function(val)
													{
													var tTemp;
													var Ioldkey = Ikey;
													var tVal = val + "";
													tVal = tVal.toUpperCase().trim();

													Ikey = null;
													if(tVal.length > 0)
															{
															Iempty = false;
															ObjTemp.removeAttribute('empty');

															for(var Key in ObjTemp.options)
																	{
																	tTemp = ObjTemp.options[Key].value + "";
																	if(tTemp.toUpperCase().trim() == tVal)
																			{
																			Ikey = Key;
																			val = ObjTemp.options[Key].value;
																			break;
																			}
																	}
															}
													else
															{
															Iempty = true;
															if(!ObjTemp.hasAttribute('focus'))
																	{
																	ObjTemp.setAttribute('empty', '');
																	val = Itemptext;
																	}
															}

													tbInput.value = val;
													HideDropBox();

													if(Ioldkey != Ikey)
															{
															Ivalue = tbInput.value;
															ObjTemp.change();
															}
													else if(Ivalue != tbInput.value)
															if(ObjTemp.strict)
																	{
																	if(Ikey)
																			{
																			ObjTemp.key = Ikey;
																			}
																	else
																			{
																			Ivalue = "";
																			tbInput.value = "";
																			}
																	}
															else
																	{
																	Ivalue = tbInput.value;
																	ObjTemp.change();
																	}
													}
											}
							});
						Object.defineProperties(ObjTemp, {
							"strict":	{
									"get": function()
										{
										return ObjTemp.hasAttribute('strict');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('strict', '');
												ObjTemp.value = ObjTemp.value;

												if(Ikey)
														{
														ObjTemp.key = Ikey;
														}
												else
														{
														Ivalue = "";
														tbInput.value = "";
														}
												}
										else
												{
												ObjTemp.removeAttribute('strict');
												}
										}
									}
							});
				/***************************
				*	Methods
				***************************/
						ObjTemp.select = function()
								{
								tbInput.select();
								};
						ObjTemp.Load = function(Tbl)
								{
								var TempKey;
								var TempValue = Ivalue;

								ObjTemp.Clear();
								ObjTemp.autoRefresh = false;

								for(var count1 = 0; count1 < Tbl.length; count1++)
										{
										var tTemp = document.createElement("tb-option");
										tTemp.Id = Tbl[count1]['Id'];
										tTemp.value = Tbl[count1]['Value'];
										tTemp.style.order = count1;
										ObjTemp.appendChild(tTemp);

										if(TempValue == tTemp.value)
												{
												TempKey = tTemp.Id;
												}
										}

								ObjTemp.autoRefresh = true;

								if(TempKey)
										{
										ObjTemp.key = TempKey;
										}
								else
										{
										ObjTemp.value = TempValue;
										}
								};
						ObjTemp.Add = function(Id, Value)
								{
								var tTemp = document.createElement("tb-option");
								tTemp.Id = Id;
								tTemp.value = Value;
								ObjTemp.appendChild(tTemp);
								};
						ObjTemp.remove = function(Key)
								{
								if(Key in ObjTemp.options)
										{
										ObjTemp.removeChild(ObjTemp.options[Key])
										delete ObjTemp.options[Key];
										}
								};
						ObjTemp.Clear = function()
								{
								for(var Key in ObjTemp.options)
										{
										ObjTemp.remove(Key);
										}
								Ikey = null;
								Ivalue = "";
								tbInput.value = "";
								};
						ObjTemp.Sort = function(SA)
								{
								var TempArray = new Array();

								for (var Count1 = 0; Count1 < SA.length; Count1++)
										{
										var Id = SA[Count1] + "";

										ObjTemp.options[Id].style.order = Count1;

										if(ObjTemp.options[Id].style.display == "block")
												{
												TempArray.push(Id);
												}
										}

								ObjTemp.List = TempArray;
								};
						ObjTemp.appendChild = function(element)
								{
								if(!('Id' in element) || !('value' in element))
										{
										throw "Invaild option for tbComboBox";
										}
								else
										{
										var OptKey = element.Id;

										if(OptKey in ObjTemp.options)
												{
												throw "Duplicate key in tbComboBox";
												}
										ObjTemp.options[OptKey] = element;

										element.slot = "ComboSlot";
										element.addEventListener("mouseenter", function(event)
												{
												ObjTemp.ListId = this.Id;
												Ileaveable = false;
												}, false);
										element.addEventListener("mouseleave", function(event)
												{
												Ileaveable = true;
												}, false);
										element.addEventListener("click", function(event)
												{
												ObjTemp.input();
												ObjTemp.key = OptKey;
												}, false);

										ObjTemp._appendChild(element);

										if(Iopenning || ObjTemp.hasAttribute('open'))
												{
												Filter(resetList(), Ifiltertest);
												}
										}
								};
						ObjTemp.insertBefore = function(newnode, existingnode)
								{
								if(!('Id' in newnode) || !('value' in newnode))
										{
										throw "Invaild option for tbComboBox";
										}
								else
										{
										var OptKey = newnode.Id + "";

										if(OptKey in ObjTemp.options)
												{
												throw "Duplicate key in tbComboBox";
												}
										ObjTemp.options[OptKey] = newnode;

										newnode.slot = "ComboSlot";
										newnode.addEventListener("mouseenter", function(event)
												{
												ObjTemp.ListId = OptKey;
												Ileaveable = false;
												}, false);
										newnode.addEventListener("mouseleave", function(event)
												{
												Ileaveable = true;
												}, false);
										newnode.addEventListener("click", function(event)
												{
												ObjTemp.input();
												ObjTemp.key = OptKey;
												}, false);

										ObjTemp._insertBefore(newnode, existingnode);

										if(Iopenning || ObjTemp.hasAttribute('open'))
												{
												Filter(resetList(), Ifiltertest);
												}
										}
								};
						ObjTemp.refresh = function()
								{
								if(ObjTemp.Loaded)
										{
										/***************************
										*	Start
										***************************/
												ObjTemp.Loaded = false;
										/***************************
										*
										***************************/
												if(tbInput.offsetParent)
														{
														resize();
														}
												else
														{
														if(!Iobserver)
																{
																Iobserver = new ResizeObserver(function(event)
																		{
																		Iobserver.disconnect();
																		resize();
																		});
																Iobserver.observe(tbInput);
																}
														}

												tbDirection = $TB.Css.get(ObjTemp, "--tbDirection");
										/***************************
										*	Finsih
										***************************/
												ObjTemp.Loaded = true;
										}
								};
						var resize = function()
								{
								/***************************
								*
								***************************/
										Iheight = ObjTemp.clientHeight;
										Iwidth = ObjTemp.clientWidth;

										var tDropHeight = $TB.Css.get(ObjTemp, '--tbDropHeight');
										if(tDropHeight)
												{
												var temp = tbDropbox.clientHeight;
												tbDropbox.style.height = tDropHeight;

												Idropheight = tbDropbox.clientHeight;
												tbDropbox.style.height = temp + "px";
												}
								/***************************
								*
								***************************/
										var dLeft  = parseInt($TB.Css.get(tbDropbox, 'border-left-width')) ? parseInt($TB.Css.get(tbDropbox, 'border-left-width')) : 0;
										var dRight	= parseInt($TB.Css.get(tbDropbox, 'border-right-width')) ? parseInt($TB.Css.get(tbDropbox, 'border-right-width')) : 0;

										tbInput.style.width = (Iwidth - parseInt($TB.Css.get(tbInput, 'padding-left') || 0) - Iheight) + "px";
										tbInput.style.height = Iheight + "px";
										tbInput.style.lineHeight = Iheight + "px";

										tbDropbox.style.width = (Iwidth - dLeft - dRight) + "px";
										tbDropbox.style.tbBarSize = Iheight + "px";
								};
						var resetList = function()
								{
								var tArray = new Array();
								var SA = new Array();

								for(var Key in ObjTemp.options)
										{
										if(ObjTemp.options[Key].style.order == "")
												{
												var temp = new Array();
												for(var count1 = 0; count1 < ObjTemp.childNodes.length; count1++)
														{
														temp.push(ObjTemp.childNodes[count1].Id + "");
														}
												return temp;
												}
										else
												{
												SA.push([Key, Number(ObjTemp.options[Key].style.order)]);
												}
										}

								SA.sort(function(a, b)
										{
										var a = a[1];
										var b = b[1];

										return a < b ? -1 : (a > b ? 1 : 0);
										});

								for (var Count1 = 0; Count1 < SA.length; Count1++)
										{
										tArray.push(SA[Count1][0]);
										}

								return tArray;
								};
						var Filter = function(SA, RegTest)
								{
								/***************************
								*	Int
								***************************/
										var Cond;
										var index;
										var TempArray = new Array();
								/***************************
								*
								***************************/
										Ifiltertest = RegTest;
								/***************************
								*	No Test  **ALL**
								***************************/
										if(RegTest == "*")
												{
												for(var Key in SA)
														{
														index = SA[Key];
														ObjTemp.options[index].style.display = "block";
														TempArray.push(index);
														}

												ObjTemp.List = TempArray;
												ObjTemp.ListPosition = 0;
												}
								/***************************
								*	Test  **Filter**
								***************************/
										else
												{
												Cond = new RegExp(RegTest, "i");

												for(var Key in SA)
														{
														index = SA[Key];
														if(Cond.test(ObjTemp.options[index].value))
																{
																ObjTemp.options[index].style.display = "block";
																TempArray.push(index);
																}
														else
																{
																ObjTemp.options[index].style.display = "none";
																}
														}

												ObjTemp.List = TempArray;
												if(ObjTemp.List.indexOf(ObjTemp.ListId) < 0)
														{
														ObjTemp.ListPosition = 0;
														}
												}
								};
						var ShowDropBox = function()
								{
								Iopenning = true;

								requestAnimationFrame(function()
										{
										if(Ilistposition < 0)
												{
												var Icurposition = 0;
												}
										else
												{
												var Icurposition = Ilistposition;
												}

										var lstElement = (ObjTemp.options[ObjTemp.List[(ObjTemp.List.length - 1)]] || 0);
										var curElement = (ObjTemp.options[ObjTemp.List[Icurposition]] || 0);

										var Iscrollheight = ((lstElement.clientHeight + lstElement.offsetTop) || 0);
										var IscrollTop = ((curElement.clientHeight + curElement.offsetTop) || 0);

										var tStyle = $TB.Css.parse(tbDropbox.style.cssText);

										var Ioffset = ObjTemp.getBoundingClientRect();

										var oTop  = parseInt($TB.Css.get(ObjTemp, 'border-top-width')) ? parseInt($TB.Css.get(ObjTemp, 'border-top-width')) : 0;
										var oBottom  = parseInt($TB.Css.get(ObjTemp, 'border-bottom-width')) ? parseInt($TB.Css.get(ObjTemp, 'border-bottom-width')) : 0;
										var oLeft  = parseInt($TB.Css.get(ObjTemp, 'border-left-width')) ? parseInt($TB.Css.get(ObjTemp, 'border-left-width')) : 0;
										var Itopanchor;
										var Ileftanchor = (oLeft + Ioffset.left);

										/* Adj tbDropbox */
										if(ObjTemp.List.length == 0)
												{
												tStyle.height = Iheight + "px";
												}
										else if(Iscrollheight < Idropheight)
												{
												tStyle.height = Iscrollheight + "px";
												}
										else
												{
												tStyle.height = Idropheight + "px";
												tbDropbox.tbScrollTop = (IscrollTop - Idropheight);
												}

										if(tbDirection == "down")
												{
												Itopanchor = (Iheight + oTop + oBottom + Ioffset.top);

												delete tStyle["border-top"];
												tStyle["border-bottom"] = "1px outset #000000";
												}
										else if(tbDirection == "up")
												{
												Itopanchor = (Ioffset.top - parseInt(tStyle.height) - 1);

												delete tStyle["border-bottom"];
												tStyle["border-top"] = "1px outset #000000";
												}
										else if(tbDirection == "auto")
												{
												var tD = ObjTemp.offsetTop + Iheight + oTop + oBottom + (parseInt(tStyle.height) + 1);
												var vD = Ioffset.top + Iheight + oTop + oBottom + (parseInt(tStyle.height) + 1);
												var tU = ObjTemp.offsetTop -  (parseInt(tStyle.height) + 1);
												var vU = Ioffset.top - (parseInt(tStyle.height) + 1);
												var wH = document.documentElement.clientHeight|| window.innerHeight;

												if(((tD > ObjTemp.offsetParent.clientHeight) || (vD > wH)) && !((tU < 0) || (vU < 0)))
														{
														Itopanchor = (Ioffset.top - parseInt(tStyle.height) - 1);

														delete tStyle["border-bottom"];
														tStyle["border-top"] = "1px outset #000000";
														}
												else
														{
														Itopanchor = (Iheight + oTop + oBottom + Ioffset.top);

														delete tStyle["border-top"];
														tStyle["border-bottom"] = "1px outset #000000";
														}
												}

										tStyle.top = Itopanchor + "px";
										tStyle.left = Ileftanchor + "px";
										tStyle.position = "fixed";
										tStyle.visibility = "inherit";
										tbDropbox.style.cssText = $TB.Css.stringify(tStyle);

										ObjTemp.setAttribute('open', '');
										Iopenning = false;

										clearInterval(Imove1);
										Imove1 = setInterval(function()
												{
												var Toffset = ObjTemp.getBoundingClientRect();

												if((Ioffset.top != Toffset.top) || (Ioffset.left != Toffset.left))
														{
														HideDropBox();
														}
												}, 100);
										});
								};
						var HideDropBox = function()
								{
								if(ObjTemp.hasAttribute('open'))
										{
										clearInterval(Imove1);

										ObjTemp.removeAttribute('open');

										var tStyle = $TB.Css.parse(tbDropbox.style.cssText);
										tStyle.top = "0px";
										tStyle.left = "0px";
										tStyle.position = "absolute";
										tStyle.visibility = "hidden";
										tbDropbox.style.cssText = $TB.Css.stringify(tStyle);
										}
								};
				/***************************
				*
				***************************/
						ObjTemp.setAttribute('empty', '');
				/***************************
				*	CssRefresh
				***************************/
						document.addEventListener("CssRefresh", function()
								{
								ObjTemp.refresh();
								}, false);
				/***************************
				*	Element Loaded
				***************************/
						ObjTemp.Loaded = true;
				}
		connectedCallback()
				{
				for(let count1 = 0; count1 < this.childNodes.length; count1++)
						{
						if((this.childNodes[count1].Id) && !(this.childNodes[count1].Id in this.options))
								{
								this.appendChild(this.childNodes[count1]);
								}
						}
				this.refresh();
				}
		static get observedAttributes()
				{
				return ['style', 'class'];
				}
		attributeChangedCallback(name, oldValue, newValue)
				{
				if(this.Loaded)
						{
						this.refresh();
						}
				}
		set onchange(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("change", function(event)
								{
								val();
								}, false);
						}
				}
		set onfocus(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("focus", function(event)
								{
								val();
								}, false);
						}
				}
		set onblur(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("blur", function(event)
								{
								val();
								}, false);
						}
				}
}

customElements.define('tb-combobox', TB_ComboBox);
/***************************
*	TB_Div
***************************/
class TB_Div extends HTMLElement
		{
		constructor()
				{
				/***************************
				*	Super
				***************************/
						super();
				/***************************
				*	Varibles
				***************************/
						var ObjTemp = this;
						var Iheight = 0;
						var Iwidth = 0;
						var Ihbarsize = 0;
						var Ivbarsize = 0;
						var Iactionheight;
						var Iactionwidth;
						var Ivscroll = "auto";
						var Ihscroll = "auto";
						var Istaticparent = false;
						var Irefresh = true;

						var tbHScrollBar;
						var tbVScrollBar;
						var tbCorner;

						ObjTemp.Loaded = false;

						ObjTemp._appendChild = ObjTemp.appendChild;
						ObjTemp._insertBefore = ObjTemp.insertBefore;

						ObjTemp.tbScroll = function(event)
								{
								var tEvent = new CustomEvent("tbScroll", {detail: {}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};

						ObjTemp.resize = function(event)
								{
								var tHeight;
								var tWidth;

								if(ObjTemp.style.height)
										{
										tHeight = ObjTemp.style.height;
										}
								else
										{
										tHeight = Iheight;
										}

								if(ObjTemp.style.width)
										{
										tWidth = ObjTemp.style.width;
										}
								else
										{
										tWidth = Iwidth;
										}

								var tEvent = new CustomEvent("resize", {detail: {'height': tHeight, 'width': tWidth}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};
				/***************************
				*	Structure
				***************************/
						/***************************
						*	Frame
						***************************/
								ObjTemp.addEventListener("scroll", function(event)
										{
										ObjTemp.scrollTop = 0;
										ObjTemp.scrollLeft = 0;
										});
								ObjTemp.addEventListener("mouseenter", function(event)
										{
										if(!ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.setAttribute('hover', '');
												}
										}, false);
								ObjTemp.addEventListener("mouseleave", function(event)
										{
										if(ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.removeAttribute('hover');
												}
										}, false);
						/***************************
						*	ShadowRoot
						***************************/
								var ShadowRoot = this.attachShadow({mode: 'open', delegatesFocus: true});
								ShadowRoot.innerHTML = "".concat("<style>",
														":host",
																"{",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"overflow: hidden;",
																"outline: none;",
																"--tbOverflow: auto;",
																"--tbOverflowX: '';",
																"--tbOverflowY: '';",
																"--tbScrollBar_width: 20px;",
																"--tbScrollBar_height: 20px;",
																"--tbUpButton: var(--imgUpButton);",
																"--tbVButton: var(--imgVButton);",
																"--tbDownButton: var(--imgDownButton);",
																"--tbLeftButton: var(--imgLeftButton);",
																"--tbHButton: var(--imgHButton);",
																"--tbRightButton: var(--imgRightButton);",
																"--tbCorner: var(--imgCorner);",
																"}",
														"#tbFog",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 100%;",
																"width: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-color: #000000;",
																"opacity: 0.5;",
																"display: none;",
																"}",
														":host([disabled]) #tbFog",
																"{",
																"display: inherit;",
																"}",
														"#tbAction",
																"{",
																"top: 0px;",
																"left: 0px;",
																"min-height: 1px;",
																"min-width: 1px;",
																"margin: 0px;",
																"position: absolute;",
																"border: none;",
																"overflow: scroll;",
																"overflow-x: scroll;",
																"overflow-y: scroll;",
																"display: inherit;",
																"flex-direction: inherit;",
																"flex-wrap: inherit;",
																"flex-flow: inherit;",
																"justify-content: inherit;",
																"align-items: inherit;",
																"align-content: inherit;",
																"}",
														 "tb-vscrollbar",
																"{",
																"top: 0px;",
																"right: 0px;",
																"width: var(--tbScrollBar_width);",
																"margin: 0px;",
																"position: absolute;",
																"--tbUpButton: inherit;",
																"--tbVButton: inherit;",
																"--tbDownButton: inherit;",
																"}",
														 "tb-hscrollbar",
																"{",
																"bottom: 0px;",
																"left: 0px;",
																"height: var(--tbScrollBar_height);",
																"margin: 0px;",
																"position: absolute;",
																"--tbLeftButton: inherit;",
																"--tbHButton: inherit;",
																"--tbRightButton: inherit;",
																"}",
														"#tbCorner",
																"{",
																"right: 0px;",
																"bottom: 0px;",
																"height: var(--tbScrollBar_height);",
																"width: var(--tbScrollBar_width);",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-image: var(--tbCorner);",
																"background-repeat: no-repeat;",
																"background-size: contain;",
																"}",
														"</style>",
														"<div id = 'tbAction'><slot id = 'aSlot' name = 'aSlot'></slot></div>",
														"<div id = 'tbCorner'></div>",
														"<div id = 'tbFog'></div>",
														"");
						/***************************
						*	tbAction
						***************************/
								var tbAction = ShadowRoot.getElementById("tbAction");
								tbAction.addEventListener("wheel", function(event)
										{
										if((tbVScrollBar) && (event.deltaY != 0))
												{
												var dis1 = 0;

												if(event.deltaMode == 0)
														{
														dis1 = event.deltaY;
														}
												else if(event.deltaMode == 1)
														{
														dis1 = event.deltaY * 100;
														}

												tbVScrollBar.ScrollValue += dis1;
												}

										if((tbHScrollBar) && (event.deltaX != 0))
												{
												var dis1 = 0;

												if(event.deltaMode == 0)
														{
														dis1 = event.deltaX;
														}
												else if(event.deltaMode == 1)
														{
														dis1 = event.deltaX * 100;
														}

												tbHScrollBar.ScrollValue += dis1;
												}

										event.stopPropagation();
										return false;
										}, false);
						/***************************
						*	ResizeObserver
						***************************/
								var Observer = new ResizeObserver(function(event)
										{
										var nSize = event[(event.length - 1)];
										var nHeight = Iheight;
										var nWidth = Iwidth;

										if(tbVScrollBar)
												{
												nHeight += tbVScrollBar.ScrollMax;
												nWidth -= Ivbarsize;
												}
										if(tbHScrollBar)
												{
												nHeight -= Ihbarsize;
												nWidth += tbHScrollBar.ScrollMax;
												}

										if((nSize.contentRect.height != nHeight) || (nSize.contentRect.width != nWidth))
												{
												window.requestAnimationFrame(function()
														{
														ObjTemp.Loaded = false;
															sizeWindow();
														ObjTemp.Loaded = true;
														});
												}
										});
								Observer.observe(tbAction);
						/***************************
						*	tbCorner
						***************************/
								var tbCorner = ShadowRoot.getElementById("tbCorner");
								tbCorner.addEventListener("mouseenter", function(event)
										{
										if(!tbCorner.hasAttribute('hover'))
												{
												tbCorner.setAttribute('hover', '');
												}
										}, false);
								tbCorner.addEventListener("mouseleave", function(event)
										{
										if(tbCorner.hasAttribute('hover'))
												{
												tbCorner.removeAttribute('hover');
												}
										}, false);
				/***************************
				*	Properties
				***************************/
						Object.defineProperties(ObjTemp, {
							"tbScrollTop": {
									"get": function()
										{
										if(tbVScrollBar)
												{
												return tbVScrollBar.ScrollValue;
												}
										else
												{
												return 0;
												}
										},
									"set": function(val)
										{
										if(tbVScrollBar)
												{
												if(val < 0)
														{
														tbVScrollBar.ScrollValue = 0;
														}
												else
														{
														tbVScrollBar.ScrollValue = val;
														}
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"tbScrollLeft": {
									"get": function()
										{
										if(tbHScrollBar)
												{
												return tbHScrollBar.ScrollValue;
												}
										else
												{
												return 0;
												}
										},
									"set": function(val)
										{
										if(tbHScrollBar)
												{
												if(val < 0)
														{
														tbHScrollBar.ScrollValue = 0;
														}
												else
														{
														tbHScrollBar.ScrollValue = val;
														}
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"tbScrollHeight": {
									"get": function()
										{
										return tbAction.scrollHeight;
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"disabled": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('disabled');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('disabled', '');
												}
										else
												{
												ObjTemp.removeAttribute('disabled');
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"autoRefresh":	{
									"get": function()
										{
										return Irefresh;
										},
									"set": function(val)
										{
										if(val)
												{
												Irefresh = true;
												ObjTemp.refresh();
												}
										else
												{
												Irefresh = false;
												}
										}
									}
							});
						Object.defineProperties(ObjTemp, {
							"staticParent": {
										"get": function()
											{
											return Istaticparent;
											},
										"set": function(val)
											{
											Istaticparent = Boolean(val);
											}
										}
							});
				/***************************
				*	Methods
				***************************/
						ObjTemp.refresh = function()
								{
								if((ObjTemp.Loaded) && (Irefresh))
										{
										/***************************
										*	Start
										***************************/
												ObjTemp.Loaded = false;
										/***************************
										*	Adj
										***************************/
												Iheight = ObjTemp.clientHeight;
												Iwidth = ObjTemp.clientWidth;

												Ihbarsize = tbCorner.clientHeight;
												Ivbarsize = tbCorner.clientWidth;

												var tBscroll = $TB.Css.get(ObjTemp, "--tbOverflow");
												var tVscroll = $TB.Css.get(ObjTemp, "--tbOverflowY");
												var tHscroll = $TB.Css.get(ObjTemp, "--tbOverflowX");

												if((tBscroll == 'visible') || (tBscroll == 'hidden') || (tBscroll == 'auto') || (tBscroll = 'scroll'))
														{
														Ivscroll = tBscroll;
														Ihscroll = tBscroll;
														}

												if((tVscroll == 'visible') || (tVscroll == 'hidden') || (tVscroll == 'auto') || (tVscroll == 'scroll'))
														{
														Ivscroll = tVscroll;
														}

												if((tHscroll == 'visible') || (tHscroll == 'hidden') || (tHscroll == 'auto') || (tHscroll == 'scroll'))
														{
														Ihscroll = tHscroll;
														}
										/***************************
										*	Resize
										***************************/
												sizeWindow();
										/***************************
										*	Finsih
										***************************/
												ObjTemp.Loaded = true;
										}
								};
						var sizeWindow = function()
								{
								/* Determine ScrollBars */
								var NeedVScroll = false;
								var NeedHScroll = false;

								/* Absolute positioned elements */
								var H1 = 0;
								var W1 = 0;
								for(var count1 = 0; count1 < ObjTemp.childNodes.length; count1++)
										{
										if(window.getComputedStyle(ObjTemp.childNodes[count1], null).getPropertyValue("position") == "absolute")
												{
												var Ht = ObjTemp.childNodes[count1].offsetTop + ObjTemp.childNodes[count1].offsetHeight;
												var Wt = ObjTemp.childNodes[count1].offsetLeft + ObjTemp.childNodes[count1].offsetWidth;

												if(Ht > H1)
														{
														H1 = Ht;
														}

												if(Wt > W1)
														{
														W1 = Wt;
														}
												}
										}

								/* Reset */
								if(Ihscroll == "visible")
										{
										ObjTemp.style.removeProperty("height");
										}
								if(Ivscroll == "visible")
										{
										ObjTemp.style.removeProperty("width");
										}

								tbAction.style.minHeight = Iheight + "px";
								tbAction.style.minWidth = "0px";
								tbAction.style.width = "0px";
								Iactionwidth = tbAction.scrollWidth;
								tbAction.style.removeProperty("width");

								tbAction.style.minWidth = (Iwidth  + 0) + "px";
								tbAction.style.minHeight = "0px";
								tbAction.style.height = "0px";
								Iactionheight = tbAction.scrollHeight;
								tbAction.style.removeProperty("height");

								/* test from veritcal */
								if(Iactionheight > Iheight)
										{
										if(Ivscroll != "hidden")
												{
												NeedVScroll = true;

												tbAction.style.minWidth = (Iwidth - Ivbarsize + $TB.ScrollBarWidth) + "px";
												tbAction.style.minHeight = "0px";
												tbAction.style.height = "0px";
												Iactionheight = tbAction.scrollHeight;
												tbAction.style.removeProperty("height");

												if((Iactionwidth + Ivbarsize) > Iwidth)
														{
														if(Ihscroll != "hidden")
																{
																NeedHScroll = true;
																}
														}
												}
										}

								/* test from horizontal */
								if (Iactionwidth > Iwidth)
										{
										if(Ihscroll != "hidden")
												{
												NeedHScroll = true;

												tbAction.style.minHeight = (Iheight - Ihbarsize + $TB.ScrollBarWidth) + "px";
												tbAction.style.minWidth = "0px";
												tbAction.style.width = "0px";
												Iactionwidth = tbAction.scrollWidth;
												tbAction.style.removeProperty("width");

												if((Iactionheight + Ihbarsize) > Iheight)
														{
														if(Ivscroll != "hidden")
																{
																NeedVScroll = true;
																}
														}
												}
										}

								/* test bar settings */
								if((Ivscroll == "scroll") || ((Ivscroll == "auto") && (NeedVScroll)))
										{
										Add_VScrollBar();
										}
								else
										{
										Remove_VScrollBar();
										}

								if((Ihscroll == "scroll") || ((Ihscroll == "auto") && (NeedHScroll)))
										{
										Add_HScrollBar();
										}
								else
										{
										Remove_HScrollBar();
										}

								if((tbVScrollBar) && (tbHScrollBar))
										{
										tbCorner.style.visibility = "inherit";
										}
								else
										{
										tbCorner.style.visibility = "hidden";
										}

								/* Disable */
								if(tbVScrollBar)
										{
										if(NeedVScroll)
												{
												tbVScrollBar.disabled = false;
												}
										else
												{
												tbVScrollBar.disabled = true;
												}
										}

								if(tbHScrollBar)
										{
										if(NeedHScroll)
												{
												tbHScrollBar.disabled = false;
												}
										else
												{
												tbHScrollBar.disabled = true;
												}
										}

								/*	Display Scrollbars */
								if(tbHScrollBar && tbVScrollBar)
										{
										tbHScrollBar.style.width = (Iwidth - Ivbarsize) + "px";
										tbHScrollBar.ScrollSmall = $TB.ScrollBarWidth;
										tbHScrollBar.ScrollLarge = $TB.ScrollBarWidth * 3;
										tbHScrollBar.ScrollMax = (Iactionwidth + Ihbarsize - Iwidth);
										tbHScrollBar.ScrollValue = tbHScrollBar.ScrollValue;

										tbVScrollBar.style.height = (Iheight - Ihbarsize) + "px";
										tbVScrollBar.ScrollSmall = $TB.ScrollBarWidth;
										tbVScrollBar.ScrollLarge = $TB.ScrollBarWidth * 3;
										tbVScrollBar.ScrollMax = (Iactionheight + Ihbarsize - Iheight);
										tbVScrollBar.ScrollValue = tbVScrollBar.ScrollValue;
										}
								else if(tbHScrollBar)
										{
										tbAction.style.top = "0px";
										tbAction.style.minHeight = (Iheight - Ihbarsize + $TB.ScrollBarWidth) + "px";

										if(W1 > 0)
												{
												tbAction.style.minWidth = (W1 + $TB.ScrollBarWidth) + "px";
												}
										else
												{
												tbAction.style.minWidth = (Iwidth + $TB.ScrollBarWidth) + "px";
												}

										tbHScrollBar.style.width = Iwidth + "px";
										tbHScrollBar.ScrollSmall = $TB.ScrollBarWidth;
										tbHScrollBar.ScrollLarge = $TB.ScrollBarWidth * 3;
										tbHScrollBar.ScrollMax = Math.max(0, (Iactionwidth - Iwidth));
										tbHScrollBar.ScrollValue = tbHScrollBar.ScrollValue;
										}
								else if(tbVScrollBar)
										{
										tbAction.style.left = "0px";
										tbAction.style.minWidth = (Iwidth - Ivbarsize + $TB.ScrollBarWidth) + "px";

										if(H1 > 0)
												{
												tbAction.style.minHeight = (H1 + $TB.ScrollBarWidth) + "px";
												}
										else
												{
												tbAction.style.minHeight = (Iheight + $TB.ScrollBarWidth) + "px";
												}

										tbVScrollBar.style.height = Iheight + "px";
										tbVScrollBar.ScrollSmall = $TB.ScrollBarWidth;
										tbVScrollBar.ScrollLarge = $TB.ScrollBarWidth * 3;
										tbVScrollBar.ScrollMax = Math.max(0, (Iactionheight - Iheight));
										tbVScrollBar.ScrollValue = tbVScrollBar.ScrollValue;
										}
								else
										{
										tbAction.style.top = "0px";
										tbAction.style.left = "0px";

										if(((Ihscroll == "visible") && (NeedHScroll)) && ((Ivscroll == "visible") && (NeedVScroll)))
												{
												ObjTemp.style.height = Iactionheight + "px";
												ObjTemp.style.width = Iactionwidth + "px";
												}
										else if((Ihscroll == "visible") && (NeedHScroll))
												{
												ObjTemp.style.width = Iactionwidth + "px";
												tbAction.style.minHeight = (Iheight + $TB.ScrollBarWidth) + "px";
												}
										else if((Ivscroll == "visible") && (NeedVScroll))
												{
												ObjTemp.style.height = Iactionheight + "px";
												tbAction.style.minWidth = (Iwidth + $TB.ScrollBarWidth) + "px";
												}
										else
												{
												tbAction.style.minHeight = (Iheight + $TB.ScrollBarWidth) + "px";
												tbAction.style.minWidth = (Iwidth + $TB.ScrollBarWidth) + "px";
												}
										}

								ObjTemp.resize();
								};
						ObjTemp.appendChild = function(element)
								{
								element.slot = "aSlot";
								ObjTemp._appendChild(element);
								};
						ObjTemp.insertBefore = function(newnode, existingnode)
								{
								newnode.slot = "aSlot";
								ObjTemp._insertBefore(newnode, existingnode);
								};
						ObjTemp.select = function()
								{
								ObjTemp.focus();
								};
						ObjTemp.Clear = function()
								{
								ObjTemp.shadowRoot.getElementById('aSlot').innerHTML = "";
								};
						var Add_HScrollBar = function()
								{
								if( !tbHScrollBar )
										{
										tbHScrollBar = document.createElement("tb-hscrollbar");
										tbHScrollBar.staticParent = true;
										tbHScrollBar.onscroll = function(event)
												{
												tbAction.style.left = (-1 * tbHScrollBar.ScrollValue) + "px";
												};
										ShadowRoot.appendChild(tbHScrollBar);
										}
								};
						var Remove_HScrollBar = function()
								{
								if(tbHScrollBar)
										{
										ShadowRoot.removeChild(tbHScrollBar);
										tbHScrollBar = null;
										}
								};
						var Add_VScrollBar = function()
								{
								if( !tbVScrollBar )
										{
										tbVScrollBar = document.createElement("tb-vscrollbar");
										tbVScrollBar.staticParent = true;
										tbVScrollBar.onscroll = function(event)
												{
												tbAction.style.top = (-1 * tbVScrollBar.ScrollValue) + "px";
												};
										ShadowRoot.appendChild(tbVScrollBar);
										}
								};
						var Remove_VScrollBar = function()
								{
								if(tbVScrollBar)
										{
										ShadowRoot.removeChild(tbVScrollBar);
										tbVScrollBar = null;
										}
								};
				/***************************
				*	CssRefresh
				***************************/
						document.addEventListener("CssRefresh", function()
								{
								ObjTemp.refresh();
								}, false);
				/***************************
				*	Element Loaded
				***************************/
						ObjTemp.Loaded = true;
				}
		connectedCallback()
				{
				if(this.childNodes.length > this.shadowRoot.getElementById('aSlot').childNodes.length)
						{
						for(let count1 = 0; count1 < this.childNodes.length; count1++)
								{
								this.appendChild(this.childNodes[0]);
								}
						}
				this.refresh();
				}
		static get observedAttributes()
				{
				return ['style', 'class'];
				}
		attributeChangedCallback(name, oldValue, newValue)
				{
				if(this.Loaded)
						{
						this.refresh();
						}
				}
		set ontbScroll(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("tbScroll", function(event)
								{
								val();
								}, false);
						}
				}
		set onresize(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("resize", function(event)
								{
								val();
								}, false);
						}
				}
}

customElements.define('tb-div', TB_Div);
/***************************
*	TB_HScrollBar
***************************/
class TB_HScrollBar extends HTMLElement
		{
		constructor()
				{
				/***************************
				*	Super
				***************************/
						super();
				/***************************
				*	Varibles
				***************************/
						var ObjTemp = this;
						var Iheight = 10;
						var Iwidth = 30;
						var Ilarge = 5;
						var Ismall = 1;
						var Imin = 0;
						var Imax = 100;
						var Ivalue = 0;
						var Iratio = 0.05;
						var Istaticparent = false;
						var Imove1;
						var Imove2;
						var Iobserver;
						ObjTemp.Loaded = false;

						ObjTemp.scroll = function(event)
								{
								var tEvent = new CustomEvent("scroll", {detail: {}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};
				/***************************
				*	Structure
				***************************/
						/***************************
						*	Frame
						***************************/
								ObjTemp.addEventListener("focus", function(event)
										{
										if(!ObjTemp.hasAttribute('focus'))
												{
												ObjTemp.setAttribute('focus', '');
												}
										}, false);
								ObjTemp.addEventListener("wheel", function(event)
										{
										var dis1 = 0;

										if(event.deltaMode == 0)
												{
												dis1 = event.deltaX;
												}
										else if(event.deltaMode == 1)
												{
												dis1 = event.deltaX * 100;
												}

										ObjTemp.ScrollValue = (Ivalue + dis1);

										event.stopPropagation();
										return false;
										}, false);
								ObjTemp.addEventListener("mouseenter", function(event)
										{
										if(!ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.setAttribute('hover', '');
												}
										}, false);
								ObjTemp.addEventListener("mouseleave", function(event)
										{
										if(ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.removeAttribute('hover');
												}
										}, false);
								ObjTemp.addEventListener("focusout", function(event)
										{
										if(ObjTemp.hasAttribute('focus'))
												{
												ObjTemp.removeAttribute('focus');
												}
										}, false);
						/***************************
						*	ShadowRoot
						***************************/
								var ShadowRoot = this.attachShadow({mode: 'open', delegatesFocus: true});
								ShadowRoot.innerHTML = "".concat("<style>",
														":host",
																"{",
																"height: 20px;",
																"width: 100px;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-color: #1233FF;",
																"overflow: hidden;",
																"cursor: pointer;",
																"outline: none;",
																"--tbLeftButton: var(--imgLeftButton);",
																"--tbHButton: var(--imgHButton);",
																"--tbRightButton: var(--imgRightButton);",
																"}",
														":host([disabled])",
																"{",
																"pointer-events: none;",
																"cursor: inherit;",
																"}",
														"#tbFog",
																"{",
																"top: 0px;",
																"left: 0px;",
																"height: 100%;",
																"width: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-color: #000000;",
																"opacity: 0.5;",
																"display: none;",
																"}",
														":host([disabled]) #tbFog",
																"{",
																"display: inherit;",
																"}",
														"div",
																"{",
																"top: 0px;",
																"height: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"}",
														".Image",
																"{",
																"background-repeat: no-repeat;",
																"background-size: contain;",
																"}",
														"#tbLeftButton",
																"{",
																"left: 0px;",
																"background-image: var(--tbLeftButton);",
																"}",
														"#tbScrollBar",
																"{",
																"background-image: var(--tbHButton);",
																"}",
														":host([disabled]) #tbScrollBar ",
																"{",
																"display: none;",
																"}",
														"#tbRightButton",
																"{",
																"background-image: var(--tbRightButton);",
																"}",
														"</style>",
														"<div id = 'tbLeftButton' class = 'Image'></div>",
														"<div id = 'tbLeftBar'></div>",
														"<div id = 'tbRightBar'></div>",
														"<div id = 'tbRightButton' class = 'Image'></div>",
														"<div id = 'tbScrollBar' class = 'Image'></div>",
														"<div id = 'tbFog'></div>",
														"");
						/***************************
						*	tbLeftButton
						***************************/
								var tbLeftButton = ShadowRoot.getElementById("tbLeftButton");
								tbLeftButton.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue - Ismall;
										}, false);
								tbLeftButton.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												ObjTemp.ScrollValue = Ivalue - Ismall;
												}, 100);
										return false;
										}, false);
								tbLeftButton.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbLeftButton.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbLeftBar
						***************************/
								var tbLeftBar = ShadowRoot.getElementById("tbLeftBar");
								tbLeftBar.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue - Ilarge;
										}, false);
								tbLeftBar.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												ObjTemp.ScrollValue = Ivalue - Ilarge;
												}, 100);
										return false;
										}, false);
								tbLeftBar.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbLeftBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbScrollBar
						***************************/
								var tbScrollBar = ShadowRoot.getElementById("tbScrollBar");
								tbScrollBar.addEventListener("mousedown", function(event)
										{
										Imove2 = setInterval(function()
												{
												var tLeft;
												var offset = ObjTemp.getBoundingClientRect();

												if(($TB.Mouse.Left)  && ($TB.Mouse.Y > (offset.top - (Iheight * 4))) && ($TB.Mouse.Y < (offset.top + (Iheight * 5))))
														{
														if($TB.Mouse.X > (offset.left + Iwidth - (Iheight * 2)))
																{
																tLeft = Iwidth - (Iheight * 2);
																}
														else
																{
																tLeft = $TB.Mouse.X - offset.left - Iheight;
																}

														ObjTemp.ScrollValue = parseInt(tLeft / Iratio);
														}
												else
														{
														clearInterval(Imove2);
														}
												}, 100);
										return false;
										}, false);
								tbScrollBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove2);
										}, false);
						/***************************
						*	tbRightBar
						***************************/
								var tbRightBar = ShadowRoot.getElementById("tbRightBar");
								tbRightBar.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue + Ilarge;
										}, false);
								tbRightBar.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												ObjTemp.ScrollValue = Ivalue + Ilarge;
												}, 100);
										return false;
										}, false);
								tbRightBar.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbRightBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbRightButton
						***************************/
								var tbRightButton = ShadowRoot.getElementById("tbRightButton");
								tbRightButton.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue + Ismall;
										}, false);
								tbRightButton.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												ObjTemp.ScrollValue = Ivalue + Ismall;
												}, 100);
										return false;
										}, false);
								tbRightButton.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbRightButton.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
				/***************************
				*	Properties
				***************************/
						Object.defineProperties(ObjTemp, {
							"ScrollMin":	{
										"get": function()
											{
											return Imin;
											},
										"set": function(val)
											{
											Imin = val;
											Iratio = (Iwidth - (Iheight * 3)) / (Imax - Imin);

											if(Ivalue < Imin)
													{
													Ivalue = Imin;
													}

											zxy();
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollMax":	{
										"get": function()
											{
											return Imax;
											},
										"set": function(val)
											{
											Imax = val;
											Iratio = (Iwidth - (Iheight * 3)) / (Imax - Imin);

											if(Ivalue > Imax)
													{
													Ivalue = Imax;
													}

											zxy();
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollValue":	{
										"get": function()
											{
											return Ivalue;
											},
										"set": function(val)
											{
											var Tvalue = Ivalue;

											if(val < Imin)
													{
													Ivalue = Imin;
													}
											else if(val > Imax)
													{
													Ivalue = Imax;
													}
											else
													{
													Ivalue = val;
													}

											if(Tvalue != Ivalue)
													{
													zxy();
													}
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollSmall":	{
										"get": function()
											{
											return Ismall;
											},
										"set": function(val)
											{
											Ismall = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollLarge":	{
										"get": function()
											{
											return Ilarge;
											},
										"set": function(val)
											{
											Ilarge = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollRatio":	{
										"get": function()
											{
											return Iratio;
											},
										"set": function(val)
											{
											Iratio = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"staticParent": {
										"get": function()
											{
											return Istaticparent;
											},
										"set": function(val)
											{
											Istaticparent = Boolean(val);
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"disabled": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('disabled');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('disabled', '');
												}
										else
												{
												ObjTemp.removeAttribute('disabled');
												}
										}
									}
							});
				/***************************
				*	Methods
				***************************/
						ObjTemp.refresh = function()
								{
								if(ObjTemp.Loaded)
										{
										/***************************
										*	Start
										***************************/
												ObjTemp.Loaded = false;
										/***************************
										*
										***************************/
												if(tbLeftButton.offsetParent)
														{
														resize();
														}
												else
														{
														if(!Iobserver)
																{
																Iobserver = new ResizeObserver(function(event)
																		{
																		Iobserver.disconnect();
																		resize();
																		});
																}
														Iobserver.observe(tbLeftButton);
														}
										/***************************
										*	Finsih
										***************************/
												ObjTemp.Loaded = true;
										}
								};
						var resize = function()
								{
								/***************************
								*	Adj
								***************************/
										Iheight = ObjTemp.clientHeight;
										Iwidth = ObjTemp.clientWidth;
								/***************************
								*	Reject
								***************************/
										ObjTemp.style.padding = "0px";
										ObjTemp.style.overflow = "hidden";
								/***************************
								*	Resize
								***************************/
										Iratio = (Iwidth - (Iheight * 3)) / (Imax - Imin);
										var Location = (Iratio * (Ivalue - Imin));

										tbLeftButton.style.width = Iheight + "px";

										tbLeftBar.style.left = Iheight + "px";
										tbLeftBar.style.width = parseInt(Location + (Iheight / 2)) + "px";

										tbScrollBar.style.left = parseInt(Location + Iheight) + "px";
										tbScrollBar.style.width = Iheight + "px";

										tbRightBar.style.left = (Location + (Iheight * 2)) + "px";
										tbRightBar.style.width = (Iwidth - Location) + "px";

										tbRightButton.style.left = (Iwidth - Iheight) + "px";
										tbRightButton.style.width = Iheight + "px";

										if((Iwidth - (Iheight * 2)) <= 0)
												{
												tbScrollBar.style.visibility = "hidden";
												}
										else
												{
												tbScrollBar.style.visibility = "inherit";
												}
								};
						var zxy = function()
								{
								var Location = (Iratio * (Ivalue - Imin));

								tbLeftBar.style.width = parseInt(Location + (Iheight / 2)) + "px";

								tbScrollBar.style.left = parseInt(Location + Iheight) + "px";

								tbRightBar.style.left = (Location + (Iheight * 2)) + "px";
								tbRightBar.style.width = (Iwidth - Location) + "px";

								ObjTemp.scroll();
								};
				/***************************
				*	CssRefresh
				***************************/
						document.addEventListener("CssRefresh", function()
								{
								ObjTemp.refresh();
								}, false);
				/***************************
				*	Element Loaded
				***************************/
						ObjTemp.Loaded = true;
				}
		connectedCallback()
				{
				this.refresh();
				}
		static get observedAttributes()
				{
				return ['style', 'class'];
				}
		attributeChangedCallback(name, oldValue, newValue)
				{
				if(this.Loaded)
						{
						this.refresh();
						}
				}
		set onscroll(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("scroll", function(event)
								{
								val();
								}, false);
						}
				}
}

customElements.define('tb-hscrollbar', TB_HScrollBar);
/***************************
*	TB_VScrollBar
***************************/
class TB_VScrollBar extends HTMLElement
		{
		constructor()
				{
				/***************************
				*	Super
				***************************/
						super();
				/***************************
				*	Varibles
				***************************/
						var ObjTemp = this;
						var Iheight = 30;
						var Iwidth = 10;
						var Ilarge = 5;
						var Ismall = 1;
						var Imin = 0;
						var Imax = 100;
						var Ivalue = 0;
						var Iratio = 0.05;
						var Istaticparent = false;
						var Imove1;
						var Imove2;
						var Iobserver;
						ObjTemp.Loaded = false;

						ObjTemp.scroll = function(event)
								{
								var tEvent = new CustomEvent("scroll", {detail: {}, bubbles: false, cancelable: false});
								ObjTemp.dispatchEvent(tEvent);
								};
				/***************************
				*	Structure
				***************************/
						/***************************
						*	Frame
						***************************/
								ObjTemp.addEventListener("focus", function(event)
										{
										if(!ObjTemp.hasAttribute('focus'))
												{
												ObjTemp.setAttribute('focus', '');
												}
										}, false);
								ObjTemp.addEventListener("wheel", function(event)
										{
										var dis1 = 0;

										if(event.deltaMode == 0)
												{
												dis1 = event.deltaY;
												}
										else if(event.deltaMode == 1)
												{
												dis1 = event.deltaY * 100;
												}

										ObjTemp.ScrollValue = (Ivalue + dis1);

										event.stopPropagation();
										return false;
										}, false);
								ObjTemp.addEventListener("mouseenter", function(event)
										{
										if(!ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.setAttribute('hover', '');
												}
										}, false);
								ObjTemp.addEventListener("mouseleave", function(event)
										{
										if(ObjTemp.hasAttribute('hover'))
												{
												ObjTemp.removeAttribute('hover');
												}
										}, false);
								ObjTemp.addEventListener("focusout", function(event)
										{
										if(ObjTemp.hasAttribute('focus'))
												{
												ObjTemp.removeAttribute('focus');
												}
										}, false);
						/***************************
						*	ShadowRoot
						***************************/
								var ShadowRoot = this.attachShadow({mode: 'open', delegatesFocus: true});
								ShadowRoot.innerHTML = "".concat("<style>",
														":host",
																"{",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"background-color: #1233FF;",
																"overflow: hidden;",
																"cursor: pointer;",
																"outline: none;",
																"--tbUpButton: var(--imgUpButton);",
																"--tbVButton: var(--imgVButton);",
																"--tbDownButton: var(--imgDownButton);",
																"}",
														":host([disabled])",
																"{",
																"pointer-events: none;",
																"cursor: inherit;",
																"}",
														"#tbFog",
																"{",
																"left: 0px;",
																"height: 100%;",
																"width: 100%;",
																"display: none;",
																"background-color: #000000;",
																"opacity: 0.5;",
																"}",
														":host([disabled]) #tbFog",
																"{",
																"display: inherit;",
																"}",
														"div",
																"{",
																"left: 0px;",
																"width: 100%;",
																"margin: 0px;",
																"padding: 0px;",
																"position: absolute;",
																"}",
														".Image",
																"{",
																"background-repeat: no-repeat;",
																"background-size: contain;",
																"}",
														"#tbUpButton",
																"{",
																"top: 0px;",
																"background-image: var(--tbUpButton);",
																"}",
														"#tbScrollBar",
																"{",
																"background-image: var(--tbVButton);",
																"}",
														":host([disabled]) #tbScrollBar",
																"{",
																"display: none;",
																"}",
														"#tbDownButton",
																"{",
																"background-image: var(--tbDownButton);",
																"}",
														"</style>",
														"<div id = 'tbUpButton' class = 'Image'></div>",
														"<div id = 'tbUpBar'></div>",
														"<div id = 'tbDownBar'></div>",
														"<div id = 'tbDownButton' class = 'Image'></div>",
														"<div id = 'tbScrollBar' class = 'Image'></div>",
														"<div id = 'tbFog'></div>",
														"");
						/***************************
						*	tbUpButton
						***************************/
								var tbUpButton = ShadowRoot.getElementById("tbUpButton");
								tbUpButton.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue - Ismall;
										}, false);
								tbUpButton.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												if($TB.Mouse.Left)
														{
														ObjTemp.ScrollValue = Ivalue - Ismall;
														}
												else
														{
														clearInterval(Imove1);
														}
												}, 100);
										return false;
										}, false);
								tbUpButton.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbUpButton.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbUpBar
						***************************/
								var tbUpBar = ShadowRoot.getElementById("tbUpBar");
								tbUpBar.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue - Ilarge;
										}, false);
								tbUpBar.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												if($TB.Mouse.Left)
														{
														ObjTemp.ScrollValue = Ivalue - Ilarge;
														}
												else
														{
														clearInterval(Imove1);
														}
												}, 100);
										return false;
										}, false);
								tbUpBar.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbUpBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbScrollBar
						***************************/
								var tbScrollBar = ShadowRoot.getElementById("tbScrollBar");
								tbScrollBar.addEventListener("mousedown", function(event)
										{
										Imove2 = setInterval(function()
												{
												var tTop;
												var offset = ObjTemp.getBoundingClientRect();

												if(($TB.Mouse.Left) && ($TB.Mouse.X > (offset.left - (Iwidth * 4))) && ($TB.Mouse.X < (offset.left + (Iwidth * 5))))
														{
														if($TB.Mouse.Y > (offset.top + Iheight - (Iwidth * 2)))
																{
																tTop = Iheight - (Iwidth * 2);
																}
														else
																{
																tTop = $TB.Mouse.Y - offset.top - Iwidth;
																}

														ObjTemp.ScrollValue = parseInt(tTop / Iratio);
														}
												else
														{
														clearInterval(Imove2);
														}
												}, 100);
										return false;
										}, false);
								tbScrollBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove2);
										}, false);
						/***************************
						*	tbDownBar
						***************************/
								var tbDownBar = ShadowRoot.getElementById("tbDownBar");
								tbDownBar.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue + Ilarge;
										}, false);
								tbDownBar.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												if($TB.Mouse.Left)
														{
														ObjTemp.ScrollValue = Ivalue + Ilarge;
														}
												else
														{
														clearInterval(Imove1);
														}
												}, 100);
										return false;
										}, false);
								tbDownBar.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbDownBar.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
						/***************************
						*	tbDownButton
						***************************/
								var tbDownButton = ShadowRoot.getElementById("tbDownButton");
								tbDownButton.addEventListener("click", function(event)
										{
										ObjTemp.ScrollValue = Ivalue + Ismall;
										}, false);
								tbDownButton.addEventListener("mousedown", function(event)
										{
										Imove1 = setInterval(function()
												{
												if($TB.Mouse.Left)
														{
														ObjTemp.ScrollValue = Ivalue + Ismall;
														}
												else
														{
														clearInterval(Imove1);
														}
												}, 100);
										return false;
										}, false);
								tbDownButton.addEventListener("mouseout", function(event)
										{
										clearInterval(Imove1);
										}, false);
								tbDownButton.addEventListener("mouseup", function(event)
										{
										clearInterval(Imove1);
										}, false);
				/***************************
				*	Properties
				***************************/
						Object.defineProperties(ObjTemp, {
							"ScrollMin":	{
										"get": function()
											{
											return Imin;
											},
										"set": function(val)
											{
											Imin = val;
											Iratio = (Iheight - (Iwidth * 3)) / (Imax - Imin);

											if(Ivalue < Imin)
													{
													Ivalue = Imin;
													}

											zxy();
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollMax":	{
										"get": function()
											{
											return Imax;
											},
										"set": function(val)
											{
											Imax = val;
											Iratio = (Iheight - (Iwidth * 3)) / (Imax - Imin);

											if(Ivalue > Imax)
													{
													Ivalue = Imax;
													}

											zxy();
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollValue":	{
										"get": function()
											{
											return Ivalue;
											},
										"set": function(val)
											{
											var Tvalue = Ivalue;

											if(val < Imin)
													{
													Ivalue = Imin;
													}
											else if(val > Imax)
													{
													Ivalue = Imax;
													}
											else
													{
													Ivalue = val;
													}

											if(Tvalue != Ivalue)
													{
													zxy();
													}
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollSmall":	{
										"get": function()
											{
											return Ismall;
											},
										"set": function(val)
											{
											Ismall = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollLarge":	{
										"get": function()
											{
											return Ilarge;
											},
										"set": function(val)
											{
											Ilarge = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"ScrollRatio":	{
										"get": function()
											{
											return Iratio;
											},
										"set": function(val)
											{
											Iratio = val;
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"staticParent": {
										"get": function()
											{
											return Istaticparent;
											},
										"set": function(val)
											{
											Istaticparent = Boolean(val);
											}
										}
							});
						Object.defineProperties(ObjTemp, {
							"disabled": 	{
									"get": function()
										{
										return ObjTemp.hasAttribute('disabled');
										},
									"set": function(val)
										{
										if(val)
												{
												ObjTemp.setAttribute('disabled', '');
												}
										else
												{
												ObjTemp.removeAttribute('disabled');
												}
										}
									}
							});
				/***************************
				*	Methods
				***************************/
						ObjTemp.refresh = function()
								{
								if(ObjTemp.Loaded)
										{
										/***************************
										*	Start
										***************************/
												ObjTemp.Loaded = false;
										/***************************
										*
										***************************/
												if(tbUpButton.offsetParent)
														{
														resize();
														}
												else
														{
														if(!Iobserver)
																{
																Iobserver = new ResizeObserver(function(event)
																		{
																		Iobserver.disconnect();
																		resize();
																		});
																}
														Iobserver.observe(tbUpButton);
														}
										/***************************
										*	Finsih
										***************************/
												ObjTemp.Loaded = true;
										}
								};
						var resize = function()
								{
								Iheight = ObjTemp.clientHeight;
								Iwidth = ObjTemp.clientWidth;

								Iratio = (Iheight - (Iwidth * 3)) / (Imax - Imin);
								var Location = (Iratio * (Ivalue - Imin));

								tbUpButton.style.height = Iwidth + "px";

								tbUpBar.style.top = Iwidth + "px";
								tbUpBar.style.height = parseInt(Location + (Iwidth / 2)) + "px";

								tbScrollBar.style.top = parseInt(Location + Iwidth) + "px";
								tbScrollBar.style.height = Iwidth + "px";

								tbDownBar.style.top = (Location + (Iwidth * 2)) + "px";
								tbDownBar.style.height = (Iheight - Location) + "px";

								tbDownButton.style.top = (Iheight - Iwidth) + "px";
								tbDownButton.style.height = Iwidth + "px";

								if((Iheight - (Iwidth * 2)) <= 0)
										{
										tbScrollBar.style.visibility = "hidden";
										}
								else
										{
										tbScrollBar.style.visibility = "inherit";
										}
								};
						var zxy = function()
								{
								var Location = (Iratio * (Ivalue - Imin));

								tbUpBar.style.height = parseInt(Location + (Iwidth / 2)) + "px";

								tbScrollBar.style.top = parseInt(Location + Iwidth) + "px";

								tbDownBar.style.top = (Location + (Iwidth * 2)) + "px";
								tbDownBar.style.height = (Iheight - Location) + "px";

								ObjTemp.scroll();
								};
				/***************************
				*	CssRefresh
				***************************/
						document.addEventListener("CssRefresh", function()
								{
								ObjTemp.refresh();
								}, false);
				/***************************
				*	Element Loaded
				***************************/
						ObjTemp.Loaded = true;
				}
		connectedCallback()
				{
				this.refresh();
				}
		static get observedAttributes()
				{
				return ['style', 'class'];
				}
		attributeChangedCallback(name, oldValue, newValue)
				{
				if(this.Loaded)
						{
						this.refresh();
						}
				}
		set onscroll(val)
				{
				if(typeof val == "function")
						{
						this.addEventListener("scroll", function(event)
								{
								val();
								}, false);
						}
				}
}

customElements.define('tb-vscrollbar', TB_VScrollBar);
